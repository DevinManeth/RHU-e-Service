// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : null;
  if (!token) return res.status(401).json({ message: "Access denied. Malformed token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};