/* src/controllers/author.js */
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

exports.create = (req, res) => createItem(res, "author", req.body);

exports.read = (req, res) => getItems(res, "author");

exports.readId = (req, res) => getItemById(res, "author", req.params.id);

exports.update = (req, res) =>
  updateItem(res, "author", req.body, req.params.id);

exports.delete = (req, res) => deleteItem(res, "author", req.params.id);
