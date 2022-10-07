let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

// Test the get Route
describe("Task API", () => {
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
});
// Test the get (by id) Route

describe("GET /api/tasks/:id", () => {
  it("It should get a task by id", (done) => {
    const taskID = 1;
    chai
      .request(server)
      .get("/api/tasks/" + taskID)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("name");
        res.body.should.have.property("completed");
        res.body.should.have.property("id").eq(1);
        done();
      });
  });
  it("It should not get a task by id", (done) => {
    const taskID = 123;
    chai
      .request(server)
      .get("/api/tasks/" + taskID)
      .end((err, res) => {
        res.should.have.status(404);
        res.text.should.be.eq("The task with the provided ID does not exist.");
        done();
      });
  });
});
// Test the POST Route
// Test the PUT Route
// Test the PATCH Route
// Test the DELETE Route
