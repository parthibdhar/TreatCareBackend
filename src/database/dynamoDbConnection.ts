const { Pool } = require('pg');

const conn = process.env.connectionString
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.connect((err: any, client: any, done: any) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    done(); // Release the client back to the pool
  }
});

module.exports = {
  query: (text: string, params: any) => pool.query(text, params)
};


