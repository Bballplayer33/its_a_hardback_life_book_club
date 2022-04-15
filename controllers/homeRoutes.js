const router = require('express').Router();
const { User, Book, Review, CurrentBook } = require('../models');
const { withAuth, authRole } = require('../utils/auth');
const Pusher = require('pusher');
require('dotenv').config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

// Homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_role: req.session.user_role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Search; search page will render results from third party API
// router.get('/search', async (req, res) => {
//   try {
//     res.render('search', {
//       user_role: req.session.user_role,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  } else {
    res.render('login');
  }
});

router.get('/forum', withAuth, (req, res) => {
  res.render('pusher', {
    logged_in: req.session.logged_in,
  });
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
    user_id: req.session.username,
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

router.post('/send-message', (req, res) => {
  pusher.trigger(
    'presence-groupChat',
    'message_sent',
    {
      username: req.body.username,
      message: req.body.message,
    },
    console.log(req.body.username)
  );
  res.send('Message sent');
});

//res.render('login');
// must be logged in to view profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // will need book and review data displayed on profile page
      include: [
        { model: Review, attributes: ['id', 'rating', 'title', 'content'] },
        {
          model: Book,
          attributes: ['title', 'author', 'link', 'id'],
          include: [{ model: CurrentBook, attributes: ['title', 'author'] }],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
      user_role: req.session.user_role,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin', async (req, res) => {
  console.log('Hit admin route');
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    //console.log(userData);

    // const users = await userData.get({ plain: true });
    const users = userData.map((item) => item.get({ plain: true }));
    console.log('Lookey here!!', userData.dataValues);
    res.render('admin', {
      users,
      logged_in: req.session.logged_in,
      user_roles: req.session.user_role,
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// maybe res.json? then serialize

module.exports = router;
