const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Customer, Banner, conn } = require("../../src/db.js");

const agent = session(app);
const customer = {
  name: "Milanesa a la napolitana",
  email: "milanesa@email.com",
};

describe("Customer routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() => Customer.sync({ force: true }));

  describe("GET /customers", () => {
    it("should get 200", () => {
      agent.post("/customer").send(customer); // agent library...simula los request.
      agent.get("/customers").expect(200);
    }).timeout(2000);
  });
  describe("GET /customers?name=abc", () => {
    it("should get 200", () =>
      agent.get("/customers?name=milanesa").expect(200)).timeout(2000);
  });
  describe("GET /customers/:id", () => {
    it("should get 200", () => agent.get("/customers/3").expect(200)).timeout(
      2000
    );
  });
  describe("POST /customer", () => {
    it("should get 200", () => {
      agent
        .post("/customer")
        .send({ name: "pasta", email: "pasta@email.com" })
        .expect(200);
    }).timeout(2000);
  });
});

describe("Banner routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to tha database:", err);
    })
  );
  beforeEach(() => Banner.sync({ force: true }));
  describe("GET /banners", () => {
    it("should get 200", () => agent.get("/banners").expect(200)).timeout(2000);
  });
  beforeEach(() => Banner.sync({ force: true }));
  describe("POST /add", () => {
    it("should get 200", () =>
      agent
        .post("/add")
        .send({ name: "mybanner", email: "image.png" })
        .expect(200)).timeout(2000);
  });
});
