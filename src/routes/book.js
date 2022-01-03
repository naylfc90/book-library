// src/routes/book.js
const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/book", bookController.create);

bookRouter.get("/book", bookController.read);

bookRouter.get("/book/:id", bookController.readOne);

bookRouter.patch("/book/:id", bookController.updateBook);

bookRouter.delete("/book/:id", bookController.deleteBook);

module.exports = bookRouter;
