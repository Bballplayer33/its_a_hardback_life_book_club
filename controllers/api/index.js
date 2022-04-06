const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/posts', reviewRoutes);

module.exports = router;
