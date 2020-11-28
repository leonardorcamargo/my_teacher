const { date, convertGrade, age } = require("../../lib/utils");
const db = require("../../config/db");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    Student.all(function (rawstudents) {
      const students = rawstudents.map((student) => ({
        ...student,
        grade: convertGrade(student.grade),
      }));
      return res.render("students/index", { students });
    });
  },
  create(req, res) {
    return res.render("students/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos");
      }
    }
    Student.create(req.body, function (id) {
      return res.redirect(`students/${id}`);
    });
  },
  show(req, res) {
    Student.find(req.params.id, function (student) {
      student.birth_date = date(student.birth_date).iso;
      student.grade = convertGrade(student.grade);
      student.age = age(student.birth_date);

      return res.render("students/show", { student });
    });
  },
  edit(req, res) {
    Student.find(req.params.id, function (student) {
      student.birth_date = date(student.birth_date).iso;

      return res.render("students/edit", { student });
    });
  },
  put(req, res) {
    Student.update(req.body, function (id) {
      return res.redirect(`students/${id}`);
    });
  },
  delete(req, res) {
    Student.delete(req.body.id, function () {
      return res.redirect("students/");
    });
  },
};
