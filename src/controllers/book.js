/* src/controllers/book.js */
const { Book } = require("../models");

exports.create = (req, res) => {
  Book.create(req.body).then((book) => {
    if (book) {
      res.status(201).json(book);
    } else {
      res.status(404).json({ error: "The book could not be created." });
    }
  });
};

exports.read = (req, res) => {
  Book.findAll().then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.readOne = (req, res) => {
  const id = req.params.id;
  Book.findByPk(id).then((book) => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  Book.update(req.body, { where: { id } }).then(([entriesUpdated]) => {
    if (entriesUpdated) {
      res.status(200).json(entriesUpdated);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  Book.destroy({
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
