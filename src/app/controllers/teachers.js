const Intl = require("intl");
const { age, date, grade } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const teachers = data.teachers.map((teacher) => ({
      ...teacher,
      grade: grade(teacher.grade),
    }));
    return res.render("teachers/index", { teachers });
  },
  create(req, res) {
    return res.render("teachers/create");
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
    return res.render("teachers/show");
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
