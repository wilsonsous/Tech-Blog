// BRING IN EXPRESS ROUTER, MODELS, AND AUTHENTICATION CUSTOM MIDDLEWARE
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL BLOG POSTS WITH TITLE, USER AND DATE FOR HOMEPAGE
router.get('/', async (req, res) => {
  try {
    // FIND ALL POSTS IN DB AND INCLUDE USER'S NAME FROM USER MODEL ASSOCIATION
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // SERIALIZE ALL POSTS' DATA
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    // RENDER HOMEPAGE WITH POSTS
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

// GET ONE POST BY ID WITH TITLE, TEXT, CREATOR'S NAME, DATE CREATED
// AND ALL COMMENTS FOR THAT POST
router.get('/posts/:id', async (req, res) => {
  try {
    // FIND THE POST FROM THE POST_ID IN URL AND INCLUDE USER'S NAME FROM USER MODEL ASSOCIATION
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    // SERIALIZE POST DATA
    const post = await postData.get({ plain: true });
    
    // CHECK IF THE POST IS THE LOGGED IN USER'S POST
    if(post.user_id === req.session.userId) {
      // CREATE NEW SESSION PARAMETER TO FLAG FOR USER'S POST IN HANDLEBARS
      req.session.userPost = true;
    } else {
      req.session.userPost = false;
    }

    // FIND ALL COMMENTS ASSOCIATED TO THE POST ID
    // INCLUDE COMMENTER'S NAME FROM ASSOCIATION OF USER MODEL TO COMMENT MODEL
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
    
    // SERIALIZE ALL COMMENT DATA
    const comments = await commentData.map((comment) =>
      comment.get({ plain: true })
    );

    // RENDER THE POST PAGE USING POST & COMMENT DATA & SESSION PARAMATERS
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

// GET THE LOGGED IN USER'S POSTS FOR THEIR DASHBOARD
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // FIND ALL POSTS FROM THE LOGGED IN USER
    // AND INCLUDE USER'S NAME FROM ASSOCIATION OF USER MODEL TO POST MODEL
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

    // SERIALIZE USER DATE SO TEMPLATE CAN READ IT
    const posts = postData.map((post) => post.get({ plain: true }));

    // RENDER THE USER'S DASHBOARD WITH POSTS & SESSION PARAMETERS FOR TEMPLATE
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

// GET ROUTE FOR LOGIN BUTTON IN NAV BAR
router.get('/login', (req, res) => {
  // IF USER IS ALREADY LOGGED IN, REDIRECT TO USER DASHBOARD
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  // OTHERWISE, REDIRECT TO THE LOGIN PAGE
  res.render('login');
});

// GET ROUTE FOR SIGNUP BUTTON ON LOGIN PAGE
router.get('/signup', (req, res) => {
  // IF USER ALREADY LOGGED IN, REDIRECT TO DASHBOARD
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  // OTHERWISE, TAKE USER TO THE ADD USER PAGE
  res.render('adduser');
});

// GET ROUTE FOR CREATING A NEW POST BUTTON
router.get('/addpost', (req, res) => {
  // REDIRECT USER TO THE ADD POST PAGE, PASSING SESSION PARAMETERS TO TEMPLATE
  res.render('addpost', {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    userName: req.session.userName,
  });
});

// GET ROUTE FOR EDITING A POST BY ID
router.get('/editpost/:id', async (req, res) => {
  try {
    // FIND THE POST DATA BY ID
    const postData = await Post.findByPk(req.params.id, {});
    
    // SERIALIZE THE POST DATA
    const post = postData.get({ plain: true });
    
    // RENDER THE EDIT POST FORM PAGE PASSING THE POST DATA AND SESSION PARAMETERS TO THE TEMPLATE
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

// EXPORT THE ROUTER
module.exports = router;