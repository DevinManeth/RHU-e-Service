const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthenticated' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { username, id, ... }
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
