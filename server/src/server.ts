import app from "./app";
import db from "./db/knex";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  console.log("DB_PASSWORD:", process.env.DB_DATABASE);
  console.log(process.env.JWT_SECRET);
});
