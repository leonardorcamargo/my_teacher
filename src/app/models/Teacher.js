const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(
      `
    SELECT teachers.*, COUNT(students) AS total_students 
      FROM  teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `,
      function (err, results) {
        if (err) throw `DATABASE ERROR! ${err}`;

        return callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
    INSERT INTO teachers (
      name,
      avatar_url,
      birth_date,
      class_type,
      subjects_taught,
      created_at,
      education_level
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNINg id
    `;
    const values = [
      data.name,
      data.avatar_url,
      date(data.birth_date).iso,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso,
      data.education_level,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0].id);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT * FROM teachers WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error ${err}`;

        callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    const query = `
    UPDATE teachers SET 
      name = $1,
      avatar_url = $2,
      birth_date = $3,
      class_type = $4,
      subjects_taught = $5,
      education_level = $6
    WHERE id = $7

    `;
    const values = [
      data.name,
      data.avatar_url,
      date(data.birth_date).iso,
      data.class_type,
      data.subjects_taught,
      data.education_level,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(data.id);
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM teachers WHERE id = $1`,
      [id],
      function (err, result) {
        if (err) throw `Database Error ${err}`;

        callback();
      }
    );
  },
  findBy(filter, callback) {
    db.query(
      `
    SELECT teachers.*, COUNT(students) AS total_students 
      FROM  teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.subjects_taught ILIKE '%${filter}%'
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `,
      function (err, results) {
        if (err) throw `DATABASE ERROR! ${err}`;

        return callback(results.rows);
      }
    );
  },
};
