const express = require('express');
const { useDb } = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const db = await useDb();
    const query = {
      text: `
        SELECT id, username, email
        FROM users
        WHERE id = $1
      `,
      values: [req.user.id]
    };
    
    const result = await db.sql.query(query);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;