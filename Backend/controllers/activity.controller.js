// Backend/controllers/activity.controller.js
const Activity = require('../models/Activity');

exports.listByUser = async (req, res) => {
  try {
    const { username, limit = 50, skip = 0 } = req.query;
    if (!username) return res.status(400).json({ message: 'username is required' });

    const [items, total] = await Promise.all([
      Activity.find({ username }).sort({ createdAt: -1 }).limit(+limit).skip(+skip).lean(),
      Activity.countDocuments({ username })
    ]);

    res.json({ items, total });
  } catch (err) {
    console.error('listByUser error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin / All requests (no username required)
exports.listAll = async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    const q = {};
    if (status && status.trim()) q.status = status.trim();

    const [items, total] = await Promise.all([
      Activity.find(q).sort({ createdAt: -1 }).limit(+limit).skip(+skip).lean(),
      Activity.countDocuments(q),
    ]);

    res.json({ items, total });
  } catch (err) {
    console.error('listAll error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
