const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product Endpoints", () => {
  describe("Post Product", () => {
    it("Should create a new Product", async () => {
      const res = await request(app).post("/api/products").send({
        name: "Chromecast",
        description: "Best product ever",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
    });
  });
  describe("Delete Product", () => {
    it("Should delete a Product", async () => {
      const resPost = await request(app).post("/api/products").send({
        name: "Chromecast",
        description: "Best product ever",
      });

      const res = await request(app).delete(`/api/products/${resPost.body.id}`);
      expect(res.statusCode).toEqual(200);
    });
  });
});
