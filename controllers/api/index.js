const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const bookRoutes = require('./bookRoutes');
const currentBookRoutes = require('./currentBookRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/books', bookRoutes);
router.use('/currentBook', currentBookRoutes);

module.exports = router;
