const jwt = require('jsonwebtoken');
const { useDb } = require('../db');
const { users } = require('../schema');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { eq } = require('drizzle-orm');


const registerUser = async (username, email, password) => {
  try {
    const db = await useDb()
    const hashedPassword = await hashPassword(password);
    console.log('here')
    const query = {
      text: `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
      `,
      values: [username, email, hashedPassword]
    };
    console.log(db)
    const result = await db.sql.query(query);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (username, password) => {
  console.log(username, password)
  try {
    const db = await useDb();
    const query = {
      text: `
        SELECT id, username, email, password
        FROM users
        WHERE username = $1
      `,
      values: [username]
    };

    const result = await db.sql.query(query); // Use db.sql.query instead of db.execute
    const user = result.rows[0];

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user: { id: user.id, username: user.username, email: user.email }, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { registerUser, loginUser };