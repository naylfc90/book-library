// src/routes/author.js
const express = require("express");
const authorController = require("../controllers/author");

const authorRouter = express.Router();

authorRouter.post("/author", authorController.create);

authorRouter.get("/author", authorController.read);

authorRouter.get("/author/:id", authorController.readId);

authorRouter.patch("/author/:id", authorController.update);

authorRouter.delete("/author/:id", authorController.delete);

module.exports = authorRouter;
