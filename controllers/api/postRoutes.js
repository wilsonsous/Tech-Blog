// BRING IN EXPRESS ROUTER, POST MODEL, AND CUSTOM MIDDLEWARE AUTHENTICATION
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST REQUEST TO CREATE A NEW POST
router.post('/', withAuth, async (req, res) => {
  try {
    // CREATE A NEW POST IN DB FROM VALUES SUBMITTED IN FORM
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.userId,
    });

    // THEN REDIRECT BACK TO THE DASHBOARD
    // https://stackoverflow.com/questions/15825333/how-to-reload-current-page-in-express-js/31652604
    res.redirect(req.get('referer'));
    res.status(200).json(postData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT REQUEST TO UPDATE A POST BY ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    // UPDATE THE SPECIFIED POST WITH VALUES SUBMITTED IN EDIT POST FORM
    const post = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE REQUEST TO REMOVE A POST BY ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // DELETE POST FROM DB WITH THAT ID
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // IF NO POST BY THAT ID, THROW A 404 ERROR
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT ROUTER
module.exports = router;