//tests/book.test.js
const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /book", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/book").send({
          title: "The Thursday Murder Club",
          author: "Richard Osman",
          genre: "Crime & Thriller",
          ISBN: "9780241988268",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("The Thursday Murder Club");
        expect(newBookRecord.title).to.equal("The Thursday Murder Club");
        expect(newBookRecord.author).to.equal("Richard Osman");
        expect(newBookRecord.genre).to.equal("Crime & Thriller");
        expect(newBookRecord.ISBN).to.equal("9780241988268");
      });

      it("checks validation when trying to create new book with empty string", async () => {
        const response = await request(app).post("/book").send({
          title: "",
          author: "Richard Osman",
          genre: "Crime & Thriller",
          ISBN: "9780241988268",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "The Thursday Murder Club",
          author: "Richard Osman",
          genre: "Crime & Thriller",
          ISBN: "9780241988268",
        }),
        Book.create({
          title: "The Girl with the Dragon Tattoo",
          author: "Stieg Larsson",
          genre: "Crime & Thriller",
          ISBN: "9780857054036",
        }),
        Book.create({
          title: "The Cuckoo's Calling",
          author: "Robert Galbraith",
          genre: "Crime & Thriller",
          ISBN: "9780751549256",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/book");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /book/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/book/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /book/:id", () => {
      it("updates books email by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/book/${book.id}`)
          .send({ author: "Rich Osman" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.author).to.equal("Rich Osman");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/book/12345")
          .send({ author: "New Author" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("DELETE /book/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/book/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/book/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
