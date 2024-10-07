import { defineConfig } from 'drizzle-kit'
require('dotenv').config({ path: './src/.env' })

export default defineConfig({
  schema: "./src/schema.js",
  dialect: 'postgresql',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
})
