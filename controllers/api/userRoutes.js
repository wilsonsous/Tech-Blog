const router = require('express').Router();
const { User } = require('../../models');

// Creates new user
router.post('/', async (req, res) => {
  try {
    // Creates new user from signup
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logins the user
router.post('/login', async (req, res) => {
  try {
    // Finds user within db
    const userData = await User.findOne({ where: { name: req.body.name } });

    // Error if user is not found within db
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Checks password within db
    const validPassword = await userData.checkPassword(req.body.password);

    // Error if password does not match
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Creates session variable for user id if login successful
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      req.session.userName = userData.name;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Request for logging out user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;