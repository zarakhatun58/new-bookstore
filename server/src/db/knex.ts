import knex from 'knex';
import { Knex } from 'knex';

// Define the configuration
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2', // or 'pg' for PostgreSQL
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations', // Ensure this path is correct
    },
  },
};

// Initialize Knex with the correct environment
const db = knex(config.development);

export default db;
