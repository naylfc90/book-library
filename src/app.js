// src/app.js
const express = require("express");
const readerController = require("./controllers/reader");
const readerModel = require("./models/reader");

const app = express();

app.use(express.json());

app.post("/reader", readerController.create);

app.get("/reader", readerController.read);

app.get("/reader/:id", readerController.readOne);

app.patch("/reader/:id", readerController.updateReader);

app.delete("/reader/:id", readerController.deleteReader);

module.exports = app;
