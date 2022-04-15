const router = require('express').Router();
const { withAuth, authRole } = require('../../utils/auth');
const { User } = require('../../models');
// get /api/users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_role = userData.role;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      console.log('session destroyed');
      res.redirect('/');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//api/users/:id
router.delete('/:id', withAuth, authRole('admin'), async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(400).json({ message: 'Bad request! Something went wrong.' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update /api/users/:id
router.put('/:id', withAuth, authRole('admin'), async (req, res) => {
  console.log('put request called');
  try {
    const updateUser = await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
