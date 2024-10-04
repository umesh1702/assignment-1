const { pgTable, serial, text, varchar } = require('drizzle-orm/pg-core');


const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
});
module.exports = { users };