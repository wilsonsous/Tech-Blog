// BRING IN SEQUELIZE CONNECTION AND MODELS
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// BRING IN SEED DATA FOR USER, POST, AND COMMENT
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')

// Function to seed database
const seedDatabase = async () => {
  // Syncs database
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Creates new users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');

  // Creates new posts
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log('\n----- POSTS SEEDED -----\n');

  // Finds all post inside database
  const posts = await Post.findAll();

  // Creates random comment
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();