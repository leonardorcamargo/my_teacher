const express = require("express");
const routes = express.Router();
const teachers = require("./controllers/teachers");
const students = require("./controllers/students");

routes.get("/", function (req, res) {
  return res.redirect("/teachers");
});
routes.get("/teachers", teachers.index);
routes.post("/teachers", teachers.post);
routes.put("/teachers", teachers.put);
routes.delete("/teachers", teachers.delete);
routes.get("/teachers/create", teachers.create);
routes.get("/teachers/:id", teachers.show);
routes.get("/teachers/:id/edit", teachers.edit);

routes.get("/", function (req, res) {
  return res.redirect("/students");
});
routes.get("/students", students.index);
routes.post("/students", students.post);
routes.put("/students", students.put);
routes.delete("/students", students.delete);
routes.get("/students/create", students.create);
routes.get("/students/:id", students.show);
routes.get("/students/:id/edit", students.edit);

module.exports = routes;
