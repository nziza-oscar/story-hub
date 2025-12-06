const { DataTypes } = require('sequelize');
const sequelize = require("../config/database")


  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM(
          'like_post',
          'comment_post',
          'follow_user',
          'mention',
          'system'
        ),
        allowNull: false
      },
      notifiable_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      notifiable_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      tableName: 'notifications',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['user_id', 'is_read'] },
        { fields: ['created_at'] }
      ]
    }
  );

 

  Notification.associate = (models) => {
    
    // Post
    Notification.belongsTo(models.Post, {
      foreignKey: 'notifiable_id',
      constraints: false,
      as: 'post',
      scope: {
        notifiable_type: 'Post'
      }
    });

    // Comment
    Notification.belongsTo(models.Comment, {
      foreignKey: 'notifiable_id',
      constraints: false,
      as: 'comment',
      scope: {
        notifiable_type: 'Comment'
      }
    });

    // User
    Notification.belongsTo(models.User, {
      foreignKey: 'notifiable_id',
      constraints: false,
      as: 'notified_user',
      scope: {
        notifiable_type: 'User'
      }
    });

    // Creator (the user receiving the notification)
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'recipient'
    });
  };

  
/**
 * 
 * First: What is the goal?
 * You want each notification to load its related model:
 * If it's about a Post, load the Post
 * If it's about a Comment, load the Comment
 * if it's about a User, load the User
 * This is called polymorphic association.
 * 
 */
  Notification.prototype.getNotifiable = function () {
    if (!this.notifiable_type) return null;
    return this[`get${this.notifiable_type}`](); // getPost(), getComment(), getUser()
  };

 module.exports=Notification
