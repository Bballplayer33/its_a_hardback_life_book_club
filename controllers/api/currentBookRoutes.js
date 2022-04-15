const router = require('express').Router();
const { CurrentBook } = require('../../models');
const { withAuth, authRole } = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const currentBook = await CurrentBook.findAll();
    res.status(200).json(currentBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

// must be logged in and an admin to add current book
router.post('/', withAuth, authRole('admin'), async (req, res) => {
  try {
    const newCurrentBook = await CurrentBook.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCurrentBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update /api/currentBook/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateCurrentBook = await CurrentBook.update(
      {
        title: req.body.title,
        author: req.body.author,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updateCurrentBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/currentBook/:id
router.delete('/:id', withAuth, authRole('admin'), async (req, res) => {
  try {
    const currentBook = await CurrentBook.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!currentBook) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(currentBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
