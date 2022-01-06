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
    ISBN: {
      type: DataTypes.STRING,
      unique: true,
    },
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
