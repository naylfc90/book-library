/* src/controllers/reader.js */
const { Reader } = require("../models");

exports.create = async (req, res) => {
  try {
    await Reader.create(req.body).then((reader) => {
      res.status(201).json(reader);
    });
  } catch (err) {
    res.sendStatus(400).json(err);
  }
};

exports.read = async (req, res) => {
  try {
    await Reader.findAll().then((reader) => {
      res.status(200).json(reader);
    });
  } catch (err) {
    res.sendStatus(404).json(err);
  }
};

exports.readOne = async (req, res) => {
  const id = req.params.id;
  await Reader.findByPk(id).then((reader) => {
    if (reader) {
      res.status(200).json(reader);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};

exports.updateReader = async (req, res) => {
  const id = req.params.id;
  await Reader.update(req.body, { where: { id } }).then(([entriesUpdated]) => {
    if (entriesUpdated) {
      res.status(200).json(entriesUpdated);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  });
};

exports.deleteReader = async (req, res) => {
  const id = req.params.id;
  await Reader.destroy({
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
