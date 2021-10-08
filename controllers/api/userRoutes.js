// BRING IN EXPRESS ROUTER AND USER MODEL
const router = require('express').Router();
const { User } = require('../../models');

// POST REQUEST TO CREATE NEW USER
router.post('/', async (req, res) => {
  try {
    // CREATE A NEW USER WITH DATA SUBMITTED IN SIGNUP FORM
    const userData = await User.create(req.body);

    // CREATE NEW SESSION PARAMETERS TO FLAG THAT USER IS LOGGED IN AND THE USER'S ID
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST ROUTE TO LOGIN A USER
router.post('/login', async (req, res) => {
  try {
    // FIND A USER IN THE DB WITH THE USERNAME SUBMITTED IN LOGIN FORM
    const userData = await User.findOne({ where: { name: req.body.name } });

    // IF NO USER IS FOUND IN DB WITH THAT USERNAME
    if (!userData) {
      // RETURN A 400 ERROR
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // USE INSTANCE METHOD TO CHECK THE SUBMITTED PASSWORD WITH DB
    const validPassword = await userData.checkPassword(req.body.password);

    // IF PASSWORD DOESN'T MATCH, THROW 400 ERROR
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // IF USER LOGIN SUCCESSFUL, CREATE SESSION VARIABLES FOR USER ID AND LOGGEDIN
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

// POST REQUEST FOR LOGGING OUT A USER
router.post('/logout', (req, res) => {
  // IF USER IS LOGGED IN, DESTROY THEIR SESSION & ASSOCIATED PARAMETERS
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// EXPORT THE ROUTER
module.exports = router;