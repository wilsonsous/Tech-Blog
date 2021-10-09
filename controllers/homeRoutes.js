const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Grabs all blog posts
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize all post data
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    // Renders homepage with given posts
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Grabs post id
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    // Serialist post data
    const post = await postData.get({ plain: true });
    
    // Checks if post is logged into user
    if(post.user_id === req.session.userId) {
      req.session.userPost = true;
    } else {
      req.session.userPost = false;
    }

    // Finds all comments related to post ID
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    // Serialized comment data
    const comments = await commentData.map((comment) =>
      comment.get({ plain: true })
    );

    // Renders posts page
    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId, 
      userPost: req.session.userPost,
      userName: req.session.userName,
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Grabs post for logged in user into dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize user date
    const posts = postData.map((post) => post.get({ plain: true }));

    // Renders user dashboard
    res.render('dashboard', { 
      posts, 
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for login button
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Route for signup button
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('adduser');
});

// Route for creating new button
router.get('/addpost', (req, res) => {
  res.render('addpost', {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    userName: req.session.userName,
  });
});

// Route for editing a post by id
router.get('/editpost/:id', async (req, res) => {
  try {
    // Finds post data by ID
    const postData = await Post.findByPk(req.params.id, {});
    
    // Serialize post data
    const post = postData.get({ plain: true });
    
    res.render('editpost', {
      ...post,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId, 
      userName: req.session.userName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;