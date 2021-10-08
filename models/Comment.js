// BRING IN SEQUELIZE MODELS AND ACCESS TO DB CONNECTION
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// CREATE A COMMENT MODEL
class Comment extends Model {}

// INITIATE THE COMMENT MODEL WITH SPECIFIED PROPERTIES
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // FOREIGN KEY FROM USER MODEL
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // FOREIGN KEY FROM POST MODEL
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id',
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// EXPORT THE COMMENT MODEL FOR USE IN ROUTES
module.exports = Comment;