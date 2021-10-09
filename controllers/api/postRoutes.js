const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Request to create new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Creates new post in db
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.userId,
    });

    // Redirect back to dashboard
    res.redirect(req.get('referer'));
    res.status(200).json(postData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Updates specified post
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

// Removes a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Deletes post id from db
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;