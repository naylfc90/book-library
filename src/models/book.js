/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Please enter a book to create.",
        },
      },
    },
    //delete author from Book model
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Please enter an author to create.",
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
    },
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
