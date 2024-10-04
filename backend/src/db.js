const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { users } = require('./schema');
require('dotenv').config();
// Create a new PostgreSQL connection pool
console.log(process.env.DB_URL, "here")
const pool = new Pool({
  connectionString: process.env.DB_URL,
  max: 50, // Maximum number of clients in the pool
});


// Function to use the database
const useDb = async () => {
  const client = await pool.connect();

  try {
    const drizzleClient = drizzle(client, { schema: { users } });
    return {
      sql: client,
      orm: drizzleClient,
    };
  } finally {
    // Release the client back to the pool after usage
    client.release();
  }
};

// Export the useDb function and the pool
module.exports = { useDb, pool };