const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "926467",
  host: "localhost",
  port: 5432,
  database: "my_teacher",
});
