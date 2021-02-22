const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Shopping Cart Endpoints", () => {
  describe("Post Shopping Cart", () => {
    it("Should create a new Shopping Cart", async () => {
      const res = await request(app).post("/api/shoppingcarts");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.state).toEqual("INITIAL");
    });
  });
  describe("Add Product to Cart", () => {
    it("Should add a Product to the Cart", async () => {
      const resPostCart = await request(app).post("/api/shoppingcarts");

      const resPostProduct = await request(app).post("/api/products").send({
        name: "Chromecast",
        description: "Best product ever",
      });

      const res = await request(app).post(
        `/api/shoppingcarts/${resPostCart.body.id}/products/${
          resPostProduct.body.id
        }/quantity/${2}`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.state).toEqual("IN_PROGRESS");
    });
  });
});
