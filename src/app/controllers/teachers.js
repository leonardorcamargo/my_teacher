const Teacher = require("../models/Teacher");
const { age, date, grade, graduation } = require("../../lib/utils");

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
      callback(rawTeachers) {
        const total = !rawTeachers[0] ? 0 : rawTeachers[0].total;
        const pagination = {
          total: Math.ceil(total / limit),
          page,
        };
        const teachers = rawTeachers.map((teacher) => ({
          ...teacher,
          subjects_taught: teacher.subjects_taught.split(","),
        }));
        return res.render("teachers/index", {
          teachers,
          pagination,
          filter,
        });
      },
    };
    Teacher.paginate(params);
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
    Teacher.create(req.body, function (id) {
      return res.redirect(`/teachers/${id}`);
    });
  },
  show(req, res) {
    Teacher.find(req.params.id, function (teacher) {
      teacher.created_at = date(teacher.created_at).format;
      teacher.age = age(Date.parse(teacher.birth_date));
      teacher.subjects_taught = teacher.subjects_taught.split(",");
      teacher.education_level = graduation(teacher.education_level);

      return res.render("teachers/show", { teacher });
    });
  },
  edit(req, res) {
    Teacher.find(req.params.id, function (teacher) {
      teacher.birth_date = date(teacher.birth_date).iso;

      return res.render("teachers/edit", { teacher });
    });
  },
  put(req, res) {
    Teacher.update(req.body, function (id) {
      return res.redirect(`teachers/${id}`);
    });
  },
  delete(req, res) {
    Teacher.delete(req.body.id, function () {
      return res.redirect("teachers/");
    });
  },
};
