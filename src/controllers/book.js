/* src/controllers/book.js */
const { Book } = require("../models");

const {
  createItem,
  getItems,
  getId,
  updateItem,
  deleteItem,
} = require("./helper");

exports.create = (req, res) => createItem(res, "book", req.body);

exports.read = (req, res) => getItems(res, "book");

exports.readId = (req, res) => getId(res, "book", req.params.id);

exports.update = (req, res) => updateItem(res, "book", req.body, req.params.id);

exports.delete = (req, res) => deleteItem(res, "book", req.params.id);
