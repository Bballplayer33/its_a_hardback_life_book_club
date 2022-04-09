const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const { response } = require('express');

router.use('/users', userRoutes);
router.use('/posts', reviewRoutes);

// Function for getting books from API
//pulling from server

module.exports = router;
