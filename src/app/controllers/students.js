const { age, date, grade } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  index(req, res) {
    const students = data.students.map((student) => ({
      ...student,
      grade: grade(student.grade),
    }));
    return res.render("students/index", { students });
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
    return;
  },
  show(req, res) {
    return res.render("students/show");
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    return;
  },
  delete(req, res) {
    return;
  },
};
