const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

function authRole(role) {
  return (req, res, next) => {
    console.log(req.session);
    if (req.session.user_role != role) {
      res.status(401);
      return res.send('Access not allowed');
    }
    next();
  };
}

module.exports = {
  withAuth,
  authRole,
};
