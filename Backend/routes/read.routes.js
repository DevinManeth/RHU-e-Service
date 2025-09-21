// Backend/routes/read.routes.js
const router = require('express').Router();
const ActivityCtrl = require('../controllers/activity.controller');

// PUBLIC read (you chose no auth)
router.get('/activities', ActivityCtrl.listByUser);

module.exports = router;
