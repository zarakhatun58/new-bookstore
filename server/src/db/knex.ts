import dotenv from 'dotenv';
dotenv.config();
import knex from 'knex';
import { Knex } from 'knex';


const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};


const db = knex(config.development);
console.log("Knex connected with config:", config.development.connection);

export default db;
