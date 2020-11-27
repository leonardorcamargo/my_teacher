const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "9722",
  host: "localhost",
  port: 5432,
  database: "my_teacher",
});
