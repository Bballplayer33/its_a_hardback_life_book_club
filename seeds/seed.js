const sequelize = require('../config/connection');

const { User, Review, Book, CurrentBook } = require('../models');

const reviewData = require('./reviewData.json');
const userData = require('./userData.json');
const bookData = require('./bookData.json');
const currentData = require('./currentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const review = await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });
  const currentBook = await CurrentBook.bulkCreate(currentData, {
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
