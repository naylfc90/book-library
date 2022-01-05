//tests/genre.test.js
const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models");
const app = require("../src/app");

describe("/genre", () => {
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /genre", () => {
      it("creates a new genre in the database", async () => {
        const response = await request(app).post("/genre").send({
          genre: "Crime & Thriller",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(newGenreRecord.genre).to.equal("Crime & Thriller");
      });

      it("checks validation when trying to create new book with empty string", async () => {
        const response = await request(app).post("/genre").send({
          genre: "",
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newGenreRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let genres;

    beforeEach(async () => {
      genres = await Promise.all([
        Genre.create({
          genre: "Crime & Thriller",
        }),
        Genre.create({
          genre: "Autobiography",
        }),
        Genre.create({
          genre: "Sport",
        }),
      ]);
    });

    describe("GET /readers", () => {
      it("gets all genre records", async () => {
        const response = await request(app).get("/genre");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((a) => a.id === genre.id);

          expect(genre.genre).to.equal(expected.genre);
        });
      });
    });

    describe("GET /genre/:id", () => {
      it("gets genres record by id", async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genre/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app).get("/genre/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The genre could not be found.");
      });
    });

    describe("PATCH /genre/:id", () => {
      it("updates genre by id", async () => {
        const genre = genres[0];
        const response = await request(app)
          .patch(`/genre/${genre.id}`)
          .send({ genre: "Fiction" });
        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedGenreRecord.genre).to.equal("Fiction");
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app)
          .patch("/genre/12345")
          .send({ genre: "Not a real genre" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The genre could not be found.");
      });
    });

    describe("DELETE /genre/:id", () => {
      it("deletes genre record by id", async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genre/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });

      it("returns a 404 if the genre does not exist", async () => {
        const response = await request(app).delete("/genre/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The genre could not be found.");
      });
    });
  });
});
