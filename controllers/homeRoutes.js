const router = require('express').Router();
const { User, Book, Review } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Search; search page will render results from third party API
router.get('/search', async (req, res) => {
  try {
    res.render('search');
  } catch (err) {
    res.status(500).json(err);
  }
});

//get login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
// must be logged in to view profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // will need book data displayed on profile page
      include: [{ model: Book }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
