// src/routes/artist.js
const express = require("express");
const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter.post("/reader", readerController.create);

readerRouter.get("/reader", readerController.read);

readerRouter.get("/reader/:id", readerController.readOne);

readerRouter.patch("/reader/:id", readerController.updateReader);

readerRouter.delete("/reader/:id", readerController.deleteReader);

module.exports = readerRouter;
