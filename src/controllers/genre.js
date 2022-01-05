/* src/controllers/genre.js */
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

exports.create = (req, res) => createItem(res, "genre", req.body);

exports.read = (req, res) => getItems(res, "genre");

exports.readId = (req, res) => getItemById(res, "genre", req.params.id);

exports.update = (req, res) =>
  updateItem(res, "genre", req.body, req.params.id);

exports.delete = (req, res) => deleteItem(res, "genre", req.params.id);
