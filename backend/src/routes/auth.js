const express = require('express');
const { registerUser, loginUser } = require('../actions/authActions')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Auth route is working" });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const result = await loginUser(username, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;