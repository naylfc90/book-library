// src/app.js
const express = require("express");
const readerRouter = require("./routes/reader");
const bookRouter = require("./routes/book");
const genreRouter = require("./routes/genre");
const authorRouter = require("./routes/author");

const app = express();

app.use(express.json());

app.use(readerRouter, bookRouter, genreRouter, authorRouter);

module.exports = app;
