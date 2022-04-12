const router = require('express').Router();
const { User, Book, Review } = require('../models');
const { withAuth, authRole } = require('../utils/auth');
const Pusher     = require('pusher');
require('dotenv').config();

const pusher = new Pusher({
  appId:     process.env.PUSHER_APP_ID,
  key:       process.env.PUSHER_APP_KEY,
  secret:    process.env.PUSHER_APP_SECRET,
  cluster:   process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

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

router.get('/forum', withAuth, (req, res) => {
  res.render('pusher');
});

router.post('/join-chat', (req, res) => {
  // store username in session
  req.session.username = req.body.username;
  res.json('Joined');
});

router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // Retrieve username from session and use as presence channel user_id
  const presenceData = {
      user_id: req.session.username
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

router.post('/send-message', (req, res) => { 
  pusher.trigger('presence-groupChat', 'message_sent', {
      username: req.body.username,
      message:  req.body.message,
  }, (console.log(req.body.username)));
  res.send('Message sent');
});

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

router.get('/admin', withAuth, authRole('admin'), async (req, res) => {
  try {
    res.render('admin', {
      ...user,
      logged_in: true,
      user_role: 'admin',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
