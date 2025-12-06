const { Sequelize } = require('sequelize');


// Import models
const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')
const Follow = require('./Follow')
const PostLike = require('./PostLike')
const Notification = require("./Notification")


// ========== USER ASSOCIATIONS ==========

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
  onDelete: 'CASCADE'
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
  onDelete: 'CASCADE'
});

// User follows many Users (through Follow)
User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'following_id',
  otherKey: 'follower_id'
});

// User is followed by many Users (through Follow)
User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'follower_id',
  otherKey: 'following_id'
});

// User likes many Posts (through PostLike)
User.belongsToMany(Post, {
  through: PostLike,
  as: 'likedPosts',
  foreignKey: 'user_id',
  otherKey: 'post_id'
});

// ========== POST ASSOCIATIONS ==========

// Post belongs to User (author)
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});



// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
  onDelete: 'CASCADE'
});


// Post is liked by many Users (through PostLike)
Post.belongsToMany(User, {
  through: PostLike,
  as: 'likedBy',
  foreignKey: 'post_id',
  otherKey: 'user_id'
});


// ========== COMMENT ASSOCIATIONS ==========

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post'
});


// ========== FOLLOW ASSOCIATIONS ==========

// Follow belongs to User (as follower)
Follow.belongsTo(User, {
  as: 'follower',
  foreignKey: 'follower_id'
});

// Follow belongs to User (as following)
Follow.belongsTo(User, {
  as: 'following',
  foreignKey: 'following_id'
});

// ========== POSTLIKE ASSOCIATIONS ==========

// PostLike belongs to User
PostLike.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

// PostLike belongs to Post
PostLike.belongsTo(Post, {
  as: 'post',
  foreignKey: 'post_id'
});





module.exports =  {
  User,
  Post,
  Comment,
  Follow,
  PostLike,
  Notification
}