const router = require('express').Router();
const { Book } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll();

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/books/
// must be logged in to add book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update /api/books/:id
router.put('/:id', withAuth, async (req, res) => {
  console.log('put request called');
  try {
    const updateBook = await Book.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updateBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/books/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
