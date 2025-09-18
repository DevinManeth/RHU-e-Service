const express = require('express');
const { login, register, dashboard } = require('../controllers/loginController');

const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const Info = require('../models/Info');

router.post("/login", login);
router.post("/register", register);
router.get("/dashboard", auth, dashboard);

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;