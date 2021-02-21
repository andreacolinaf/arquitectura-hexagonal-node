const request = require("supertest");
const app = require("../../src/app");
const mongoose = require('mongoose');

// describe("Products tests", () => {
//   test("Create product", async () => {
//     const response = await request.post('/api/products/')
//     .send({
//         name: "Chromecast",
//         description: "Best product ever"
//     })
//     .expect('Content-type', /json/)
//     .expect(200, {
//         name: "Chromecast",
//         description: "Best product ever"
//     });
//   });

//   test("Delete product", async () => {

//   });
//});

beforeAll( async ()=>{
  await mongoose.connect('mongodb://localhost:27017');
})

afterAll(async () => {
  await mongoose.connection.close()
});

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
describe('Post Endpoints', () => {
  it('Should create a new Product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: "Chromecast",
        description: "Best product ever"
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('id')
  })
})
