const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init (
   {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      

    },
  
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
    },

    blog_post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "blog_post",
          key: "id",
        },
    },

   },
   {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
   }
);

module.exports = Comment;