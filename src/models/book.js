/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
