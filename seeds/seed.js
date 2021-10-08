// BRING IN SEQUELIZE CONNECTION AND MODELS
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// BRING IN SEED DATA FOR USER, POST, AND COMMENT
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')

// FUNCTION TO SEED DATABASE
const seedDatabase = async () => {
  // SYNC THE DATABASE
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // CREATE NEW USERS WITH USER SEED DATA, PASS THROUGH HOOKS FOR PASSWORD HASHING
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');

  // CREATE NEW POST FOR EACH POST IN POST SEED DATA, RANDOMLY ASSIGNING A USER ID
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log('\n----- POSTS SEEDED -----\n');

  // FIND ALL POSTS IN DB
  const posts = await Post.findAll();

  // CREATE NEW COMMENT FOR EACH COMMENT IN COMMENT SEED DATA
  // RANDOMLY ASSIGN A USER ID AND POST ID TO COMMENT
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

// RUN THE SEED DATABASE FUNCTION
seedDatabase();