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

// controllers/activity.controller.js
exports.listMine = async (req, res) => {
  try {
    const username = req.user?.username;
    if (!username) return res.status(401).json({ message: 'Unauthenticated' });

    const limit = Math.max(0, parseInt(req.query.limit ?? '50', 10));
    const skip  = Math.max(0, parseInt(req.query.skip  ?? '0', 10));
    const rawStatus = (req.query.status || '').trim().toLowerCase();

    const q = { username };
    if (rawStatus) {
      const statuses = rawStatus.split(',').map(s => s.trim()).filter(Boolean);
      q.status = statuses.length > 1 ? { $in: statuses } : statuses[0];
    }

    const [items, total] = await Promise.all([
      Activity.find(q).sort({ createdAt: -1 }).limit(limit).skip(skip).lean(),
      Activity.countDocuments(q),
    ]);

    res.json({ items, total });
  } catch (err) {
    console.error('listMine error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const allowed = ['waiting', 'processing', 'completed', 'done', 'rejected'];
    if (!allowed.includes((status || '').toLowerCase())) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const update = { status: status.toLowerCase() };
    if (update.status === 'completed') update.completedAt = new Date();

    const doc = await Activity.findOneAndUpdate(
      { requestId },
      update,
      { new: true }
    );

    if (!doc) return res.status(404).json({ message: 'Activity not found' });

    res.json({ message: 'Status updated', activity: doc });
  } catch (err) {
    console.error('updateStatus error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
