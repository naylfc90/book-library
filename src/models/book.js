/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Please enter a genre to create.",
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Please enter a genre to create.",
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
