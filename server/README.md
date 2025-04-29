# Bookstore RESTful API

This is a TypeScript-based Express.js REST API to manage authors and books.

## Tech Stack
- TypeScript
- Express
- Knex
- MySQL
- Express Validator
- dotenv

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` file
4. Run migrations: `knex migrate:latest`
5. Start server: `npm run dev`

## API Endpoints
- `/authors`
- `/books`


Step	Tip
MySQL Server	Must always be started in XAMPP before you npm run dev
Port 3306	Default MySQL port, unless you changed it
Database	Must be created first (in phpMyAdmin)
User	Usually root, password empty

