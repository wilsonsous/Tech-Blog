   const withAuth = (req, res, next) => {
    // IF THE USER IS NOT LOGGED IN, REDIRECT TO THE LOGIN PAGE
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // IF THE USER IS LOGGED IN (AUTHENTICATED), EXECUTE THE NEXT FUNCTION
      next();
    }
  };
  
  module.exports = withAuth;