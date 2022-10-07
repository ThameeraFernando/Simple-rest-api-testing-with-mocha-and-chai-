let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Task API", () => {
  // Test the get Route
  describe("GET /api/tasks", () => {
    it("It should get all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(3);
          done();
        });
    });
    it("It should not get all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/task")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  // Test the get (by id) Route
  // Test the POST Route
  // Test the PUT Route
  // Test the PATCH Route
  // Test the DELETE Route
});
