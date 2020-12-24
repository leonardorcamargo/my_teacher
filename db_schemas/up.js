require("dotenv").config();
const db = require("../src/config/db");

async function up() {
  console.info("Creating teachers table");
  await db.query(`
  CREATE TABLE teachers
  (
    id serial,
    avatar_url text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    birth_date timestamp without time zone NOT NULL,
    education_level text COLLATE pg_catalog."default" NOT NULL,
    class_type text COLLATE pg_catalog."default" NOT NULL,
    subjects_taught text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT teachers_pkey PRIMARY KEY (id)
    );
  `);

  console.info("Creating students table");
  await db.query(`
    CREATE TABLE students
    (
      id serial,
      avatar_url text COLLATE pg_catalog."default" NOT NULL,
      name text COLLATE pg_catalog."default" NOT NULL,
      birth_date timestamp without time zone NOT NULL,
      email text COLLATE pg_catalog."default" NOT NULL,
      grade text COLLATE pg_catalog."default" NOT NULL,
      workload numeric NOT NULL,
      teacher_id integer,
      CONSTRAINT students_pkey PRIMARY KEY (id)
    );
  `);

  console.info("Creating FK");
  await db.query(`
    ALTER TABLE "students"
    ADD CONSTRAINT "FK_teachers_id" FOREIGN KEY ( "teacher_id" )
    REFERENCES "teachers" ( "id" ) MATCH FULL
    ON DELETE No Action
    ON UPDATE Cascade;
  `);
  console.info("All done!");
}

up();
