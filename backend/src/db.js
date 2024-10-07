const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { users } = require('./schema');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  max: 50,
});


const useDb = async () => {
  const client = await pool.connect();

  try {
    const drizzleClient = drizzle(client, { schema: { users } });
    return {
      sql: client,
      orm: drizzleClient,
    };
  } finally {
    
    client.release();
  }
};

module.exports = { useDb, pool };