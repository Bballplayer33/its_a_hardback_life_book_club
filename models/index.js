const User = require('./User');
const Review = require('./Review');
const Book = require('./Book');
const Role = require('./Role');

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Book, {
  foreignKey: 'book_id',
  //   onDelete: 'CASCADE',
});

Book.hasMany(Review, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
});

// User.hasOne(Role, {
//   foreignKey: 'user_id',
//   as: 'role',
// });

module.exports = { User, Review, Book };
