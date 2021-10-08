// BRING IN USER, POST, AND COMMENT MODELS
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A USER HAS MANY POSTS, AND DELETE POSTS UPON USER DELETION
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A POST BELONGS TO A USER ON THE FK of user_id
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// A USER HAS MANY COMMENTS, AND DELETE COMMENTS UPON USER DELETION
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// A COMMENT BELONGS TO A USER ON FK user_id
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

// A POST HAS MANY COMMENTS, AND DELETE COMMENTS UPON POST DELETION
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

// A COMMENT BELONGS TO A POST ON FK post_id
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

// EXPORT USER, POST, AND COMMENT MODELS FOR USE IN ROUTES
module.exports = { User, Post, Comment };