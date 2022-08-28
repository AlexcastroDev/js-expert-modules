const { deepStrictEqual } = require("assert")
const { describe, it } = require("mocha")
const request = require("supertest")
const app = require("./api")

describe("API Suite test", () => {
  it("Should request an inexistent route and redirect to /", async () => {
    const response = await request(app).get("/not-exist").expect(200)
    deepStrictEqual(response.text, "Hello")
  })
  it("Should request /contact", async () => {
    const response = await request(app).get("/contact").expect(200)
    deepStrictEqual(response.text, "Contact test")
  })
  it("Should request /login successfully", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alex", password: "123456" })
      .expect(200)

    deepStrictEqual(response.text, "Logged")
  })
  it("Should failt /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "alex", password: "12" })
      .expect(401)

    deepStrictEqual(response.text, "Unauthorized")
  })
})
