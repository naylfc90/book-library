// src/routes/artist.js
const express = require("express");
const readerController = require("../controllers/reader");

const readerRouter = express.Router();

readerRouter.post("/reader", readerController.create);

readerRouter.get("/reader", readerController.read);

readerRouter.get("/reader/:id", readerController.readId);

readerRouter.patch("/reader/:id", readerController.update);

readerRouter.delete("/reader/:id", readerController.delete);

module.exports = readerRouter;
