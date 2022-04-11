const router = require('express').Router();
const { Review } = require('../../models');
const { withAuth, authRole } = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll();

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/reviews/
// must be logged in to add review
router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update /api/reviews/:id
router.put('/:id', withAuth, async (req, res) => {
  console.log('put request called');
  try {
    const updateReview = await Review.update(
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

    res.status(200).json(updateReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/reviews/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
