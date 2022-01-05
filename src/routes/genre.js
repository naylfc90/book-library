// src/routes/genre.js
const express = require("express");
const genreController = require("../controllers/genre");

const genreRouter = express.Router();

genreRouter.post("/genre", genreController.create);

genreRouter.get("/genre", genreController.read);

genreRouter.get("/genre/:id", genreController.readId);

genreRouter.patch("/genre/:id", genreController.update);

genreRouter.delete("/genre/:id", genreController.delete);

module.exports = genreRouter;
