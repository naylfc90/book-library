/* src/controllers/book.js */
const { Book } = require("../models");

exports.create = async (req, res) => {
  try {
    await Book.create(req.body).then((book) => {
      res.status(201).json(book);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.read = async (req, res) => {
  await Book.findAll().then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.readOne = async (req, res) => {
  const id = req.params.id;
  await Book.findByPk(id).then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.updateBook = async (req, res) => {
  const id = req.params.id;
  await Book.update(req.body, { where: { id } }).then(([entriesUpdated]) => {
    if (entriesUpdated) {
      res.status(200).json(entriesUpdated);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  await Book.destroy({
    where: {
      id,
    },
  }).then((deleted) => {
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};
