require("dotenv").config();
const db = require("../src/config/db");

async function down() {
  console.info("Drop students table");
  await db.query(`DROP TABLE IF EXISTS "public"."students" CASCADE;`);
  console.info("Drop teachers table");
  await db.query(`DROP TABLE IF EXISTS "public"."teachers" CASCADE;`);
  console.info("All done!");
}

down();
