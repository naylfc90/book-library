/* src/controllers/reader.js */
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

exports.create = (req, res) => createItem(res, "reader", req.body);

exports.read = (req, res) => getItems(res, "reader");

exports.readId = (req, res) => getItemById(res, "reader", req.params.id);

exports.update = (req, res) =>
  updateItem(res, "reader", req.body, req.params.id);

exports.delete = (req, res) => deleteItem(res, "reader", req.params.id);
