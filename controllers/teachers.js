const fs = require("fs");
const data = require("../data.json");
const Intl = require("intl");
const { age, date, graduation } = require("../utils");

exports.index = function (req, res) {
  const teachers = data.teachers.map((teacher) => ({
    ...teacher,
    services: teacher.services.split(","),
  }));
  return res.render("teachers/index", { teachers });
};

exports.create = function (req, res) {
  return res.render("teachers/create");
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor preencha todos os campos");
    }
  }

  let { avatar_url, name, birth, education, classtype, services } = req.body;

  birth = Date.parse(req.body.birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    education,
    classtype,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/teachers/${id}`);
  });

  // return res.send(req.body)
};

exports.show = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    services: foundTeacher.services.split(","),
    age: age(foundTeacher.birth),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundTeacher.created_at
    ),
    education: graduation(foundTeacher.education),
  };

  return res.render("teachers/show", { teacher });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth),
  };

  return res.render("teachers/edit", { teacher });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
    if (id == teacher.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth),
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect(`/teachers/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredTeachers = data.teachers.filter(function (teacher) {
    return teacher.id != id;
  });

  data.teachers = filteredTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect("/teachers");
  });
};
