// Backend/routes/read.routes.js
const router = require('express').Router();
const ActivityCtrl = require('../controllers/activity.controller');

// Admin: ALL activities
router.get('/activities', ActivityCtrl.listAll);

// PUBLIC read (you chose no auth)
router.get('/activities', ActivityCtrl.listByUser);

module.exports = router;
