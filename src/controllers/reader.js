/* src/controllers/reader.js */
const { Reader } = require("../models");

exports.create = (req, res) => {
  Reader.create(req.body).then((reader) => {
    if (reader) {
      res.status(201).json(reader);
    } else {
      res.status(404).json({ error: "The reader could not be created." });
    }
  });
};

exports.read = (req, res) => {
  Reader.findAll().then((reader) => {
    if (reader) {
      res.status(200).json(reader);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};

exports.readOne = (req, res) => {
  const id = req.params.id;
  Reader.findByPk(id).then((reader) => {
    if (reader) {
      res.status(200).json(reader);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};

exports.updateReader = (req, res) => {
  const id = req.params.id;
  Reader.update(req.body, { where: { id } }).then(([entriesUpdated]) => {
    if (entriesUpdated) {
      res.status(200).json(entriesUpdated);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};

exports.deleteReader = (req, res) => {
  const id = req.params.id;
  Reader.destroy({
    where: {
      id,
    },
  }).then((deleted) => {
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};
