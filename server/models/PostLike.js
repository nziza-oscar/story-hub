const { DataTypes } = require('sequelize');
const sequelize = require("../config/database")

  const PostLike = sequelize.define('PostLike', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  }, {
    tableName: 'post_likes',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'post_id']
      }
    ]
  });

module.exports=PostLike