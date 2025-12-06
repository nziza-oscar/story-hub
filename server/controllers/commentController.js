const { Comment, Post, User } = require('../models');

const createComment = async (req, res) => {
  try {
    const { content, post_id } = req.body;
    
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({
      content,
      post_id,
      user_id: req.userId
    });

    await post.incrementCommentCount();
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'avatar'] },
        { model: Post, as: 'post', attributes: ['id', 'title', 'slug'] }
      ]
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await comment.update({ content: req.body.content });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const post = await Post.findByPk(comment.post_id);
    await comment.destroy();
    
    if (post) {
      await post.decrementCommentCount();
    }

    res.json({ message: 'Comment deleted successfully', id:req.params.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment
};