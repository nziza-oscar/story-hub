const { User, Post, Comment } = require('../models');

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Check if user owns resource (post)
const isPostOwner = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.user_id !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if user owns resource (comment)
const isCommentOwner = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.user_id !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if user owns resource (user profile)
const isProfileOwner = (req, res, next) => {
  if (req.params.id && req.params.id != req.userId && req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  next();
};

module.exports = {
  isAdmin,
  isPostOwner,
  isCommentOwner,
  isProfileOwner
};