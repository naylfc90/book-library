// tests/models.test.js
const { expect } = require("chai");
const request = require("supertest");
const { Author, Book, Genre } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with records in the database", () => {
    let books;
    let authors;
    let genres;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Jack Reacher",
          ISBN: "1234567",
        }),
      ]);

      authors = await Promise.all([
        Author.create({
          author: "Lee Child",
        }),
      ]);

      genres = await Promise.all([
        Genre.create({
          genre: "Crime",
        }),
      ]);
    });

    describe("PATCH /book/:id", () => {
      it("updates books record by PATCHing foreign keys", async () => {
        const book = books[0];
        const genre = genres[0];
        const author = authors[0];
        const response = await request(app)
          .patch(`/book/${book.id}`)
          .send({ GenreId: genre.id, AuthorId: author.id });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.GenreId).to.equal(genre.id);
        expect(updatedBookRecord.AuthorId).to.equal(author.id);
      });
    });
  });
});
