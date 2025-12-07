const { Post, User, Comment, PostLike } = require('../models');
const { uploadImage, deleteImage } = require('../config/cloudinary');
const {Op} = require("sequelize")

const NotificationService = require("../services/notificationService")

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatar'] },
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json(posts);
  } catch (error) {
   return  res.status(400).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatar', 'bio'] },
        { model: Comment, as: 'comments', include: [
          { model: User, as: 'user', attributes: ['id', 'username', 'avatar'] }
        ]}
      ]
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // await post.incrementViewCount();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 function generateSlug(title) {
            return title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/--+/g, '-')
              .trim();
          }

const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    let photo_url={}
    const slug = generateSlug(title)

    if (req.file) {
      photo_url=uploadImage(req.file)
    }
  
    const post = await Post.create({
      title,
      content,
      featured_image:photo_url.url,
      user_id: req.userId,
      tags,
      slug
    });

    return res.status(201).json(post);
  } catch (error) {
   return  res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, content, category_id, status } = req.body;
    let updateData = { title, content, category_id, status };

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const imageResult = await uploadImage(dataURI, 'storyhub/posts');
      updateData.featured_image = imageResult.url;
    }

    await post.update(updateData);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully', id:req.params.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'avatar'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include:{
        model:User,
        as: 'author'

      }
    });
    const liker = await User.findByPk(req.userId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const [like, created] = await PostLike.findOrCreate({
      where: {
        user_id: req.userId,
        post_id: post.id
      }
    });

    if (created) {
      await post.incrementLikeCount();
      const data = {
          user:liker.username, 
          profile: liker.avatar,
          email:liker.email,
          id:liker.id
      }

      NotificationService.notify({
        userId:req.userId,
        notifiableId: post.author.id,
        notifiableModelName:"User",
        type:"like_post",
        message:`${liker.username} liked your post.`,
        data
      })
    }

    res.json({ liked: true, count: post.like_count + (created ? 1 : 0), id:req.params.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const deleted = await PostLike.destroy({
      where: {
        user_id: req.userId,
        post_id: post.id
      }
    });

    if (deleted) {
      await post.decrementLikeCount();
    }

    res.json({ liked: false, count: post.like_count - (deleted ? 1 : 0) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
  likePost,
  unlikePost
};