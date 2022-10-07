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
describe("POST /api/tasks", () => {
  it("It should CREATE a new task", (done) => {
    const task = {
      name: "Task 4",
      completed: false,
    };
    chai
      .request(server)
      .post("/api/tasks")
      .send(task)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("id").eq(4);
        res.body.should.have.property("name").eq("Task 4");
        res.body.should.have.property("completed").eq(false);
        done();
      });
  });
  it("It should not CREATE a new task without the name property", (done) => {
    const task = {
      completed: false,
    };
    chai
      .request(server)
      .post("/api/tasks")
      .send(task)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eq("The name should be at least 3 chars long!");
        done();
      });
  });
});
// Test the PUT Route
describe("PUT /api/tasks/:id", () => {
  it("It should REPLACE a existing task", (done) => {
    const taskID = 1;
    const task = {
      name: "Task one changed",
      completed: true,
    };
    chai
      .request(server)
      .put("/api/tasks/" + taskID)
      .send(task)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id").eq(1);
        res.body.should.have.property("name").eq("Task one changed");
        res.body.should.have.property("completed").eq(true);
        done();
      });
  });
  it("It should NOT REPLACE a existing task", (done) => {
    const taskID = 1;
    const task = {
      name: "Ta",
      completed: true,
    };
    chai
      .request(server)
      .put("/api/tasks/" + taskID)
      .send(task)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eq("The name should be at least 3 chars long!");
        done();
      });
  });
});
// Test the PATCH Route

describe("PATCH /api/tasks/:id", () => {
  it("It should UPDATE a existing task", (done) => {
    const taskID = 1;
    const task = {
      name: "Task one changed",
    };
    chai
      .request(server)
      .patch("/api/tasks/" + taskID)
      .send(task)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id").eq(1);
        res.body.should.have.property("name").eq("Task one changed");
        res.body.should.have.property("completed").eq(true);
        done();
      });
  });
  it("It should NOT UPDATE a existing task", (done) => {
    const taskID = 1;
    const task = {
      name: "Ta",
    };
    chai
      .request(server)
      .patch("/api/tasks/" + taskID)
      .send(task)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eq("The name should be at least 3 chars long!");
        done();
      });
  });
});

// Test the DELETE Route

describe("DELETE /api/tasks/:id", () => {
  it("It should delete a existing task", (done) => {
    const taskID = 1;
    chai
      .request(server)
      .delete("/api/tasks/" + taskID)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("It should not delete a existing task", (done) => {
    const taskID = 134;
    chai
      .request(server)
      .delete("/api/tasks/" + taskID)
      .end((err, res) => {
        res.should.have.status(404);
        res.text.should.be.eq("The task with the provided ID does not exist.");
        done();
      });
  });
});
