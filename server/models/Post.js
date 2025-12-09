const { DataTypes } = require('sequelize');
const sequelize = require("../config/database")

  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    },
    tags:{
      type:DataTypes.STRING,
      allowNull:true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 10000]
      }
    },
    
    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    
    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
    
  }, {
    tableName: 'posts',
    timestamps: true,
    hooks: {
      beforeCreate: (post) => {
        if (!post.slug && post.title) {

          function generateSlug(title) {
            return title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/--+/g, '-')
              .trim();
          }
          
          post.slug = generateSlug(post.title);
        }

      },
     
    }
  });

 
  // Instance method to increment like count
  Post.prototype.incrementLikeCount = async function() {
    this.like_count += 1;
    await this.save();
  };

  // Instance method to decrement like count
  Post.prototype.decrementLikeCount = async function() {
    this.like_count = Math.max(0, this.like_count - 1);
    await this.save();
  };

  // Instance method to increment comment count
  Post.prototype.incrementCommentCount = async function() {
    this.comment_count += 1;
    await this.save();
  };

  // Instance method to decrement comment count
  Post.prototype.decrementCommentCount = async function() {
    this.comment_count = Math.max(0, this.comment_count - 1);
    await this.save();
  };8

  // Instance method to get post URL
  Post.prototype.getUrl = function() {
    return `/posts/${this.slug}`;
  };

  // Instance method to get formatted publish date
  Post.prototype.getFormattedDate = function() {
    if (!this.published_at) return null;
    return this.published_at.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  

 module.exports = Post