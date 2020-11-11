const fs = require("fs");
const data = require("../data.json");
const Intl = require("intl");
const { age, date, grade } = require("../utils");

exports.index = function (req, res) {
  const students = data.students.map((student) => ({
    ...student,
    grade: grade(student.grade),
  }));
  return res.render("students/index", { students });
};

exports.create = function (req, res) {
  return res.render("students/create");
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor preencha todos os campos");
    }
  }

  let { avatar_url, name, birth, email, grade, workload } = req.body;

  birth = Date.parse(req.body.birth);
  const id = Number(data.students.length + 1);

  data.students.push({
    id,
    avatar_url,
    name,
    birth,
    email,
    grade,
    workload,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/students/${id}`);
  });

  // return res.send(req.body)
};

exports.show = function (req, res) {
  const { id } = req.params;

  const foundStudent = data.students.find(function (student) {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    age: age(foundStudent.birth),
    grade: grade(foundStudent.grade),
  };

  return res.render("students/show", { student });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundStudent = data.students.find(function (student) {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).birthDay,
  };

  return res.render("students/edit", { student });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find(function (student, foundIndex) {
    if (id == student.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundStudent) return res.send("Student not found");

  const student = {
    ...foundStudent,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth),
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect(`/students/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredStudents = data.students.filter(function (student) {
    return student.id != id;
  });

  data.students = filteredStudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error");

    return res.redirect("/students");
  });
};
