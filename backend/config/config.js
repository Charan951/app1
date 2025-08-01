const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.RENDERDB,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Successfully connected to Render Postgres DB');
  } catch (err) {
    console.error('Failed to connect to Render Postgres DB:', err.message);
  }
};

connectToDB();

module.exports = client;
