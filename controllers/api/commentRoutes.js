// BRING IN EXPRESS ROUTER AND COMMENT MODEL
const router = require('express').Router();
const { Comment } = require('../../models');

// POST REQUEST TO ADD A NEW COMMENT TO A POST
router.post('/', async (req, res) => {
  try {
    // CREATE A COMMENT FROM POST REQUEST BODY VALUES AND SESSION PARAMETER OF USERID
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.userId,
      post_id: req.body.post_id,
    });

    // REDIRECT BACK TO THE POST PAGE THAT WAS COMMENTED ON
    // https://stackoverflow.com/questions/15825333/how-to-reload-current-page-in-express-js/31652604
    res.redirect(req.get('referer'));
  } catch (err) {
    res.status(400).json(err);
  }
});

// EXPORT ROUTER
module.exports = router;
 