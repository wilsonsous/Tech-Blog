const router = require('express').Router();
const { Comment } = require('../../models');

// Adds new comment to post
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.userId,
      post_id: req.body.post_id,
    });

    res.redirect(req.get('referer'));
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
 