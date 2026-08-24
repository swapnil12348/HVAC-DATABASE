// backend/config/db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Loads the .env variables

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for cloud databases like Neon
  }
});

pool.on('connect', () => {
  console.log('✅ Connected to Neon Cloud Database');
});

export default pool;