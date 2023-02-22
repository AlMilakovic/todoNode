import { describe, it } from "mocha";
import app from "../src/index";
import request from "supertest";
import { expect } from "chai";

const authenticatedUser = request.agent(app);

describe("ROUTES TEST", function () {
  it("USER login", function (done) {
    authenticatedUser
      .post("/api/user/login")
      .send({
        email: "example@email.com",
        password: "Test123!",
      })
      .expect(200)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
  it("GET /todo", function (done) {
    authenticatedUser
      .get("/api/todo")

      .expect(200)
      .end((err, response) => {
        expect(Array.isArray(response.body.data)).to.be.true;
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
