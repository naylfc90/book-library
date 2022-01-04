/* src/models/reader.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      required: true,
      notEmpty: true,
      isEmail: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      notEmpty: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      notEmpty: true,
      validate: {
        len: {
          args: [8],
          msg: "Password must be minimum 8 characters.",
        },
      },
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
