const { date, convertGrade, age } = require("../../lib/utils");
const db = require("../../config/db");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;
    page = page || 1;
    limit = limit || 5;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(rawStudents) {
        const total = !rawStudents[0] ? 0 : rawStudents[0].total;
        const pagination = {
          total: Math.ceil(total / limit),
          page,
        };
        const students = rawStudents.map((student) => ({
          ...student,
          grade: convertGrade(student.grade),
        }));
        return res.render("students/index", {
          students,
          pagination,
          filter,
        });
      },
    };
    Student.paginate(params);
  },
  create(req, res) {
    Student.teachersSelectOptions(function (options) {
      return res.render("students/create", { teachersOptions: options });
    });
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
      Student.teachersSelectOptions(function (options) {
        return res.render("students/edit", {
          student,
          teachersOptions: options,
        });
      });
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
