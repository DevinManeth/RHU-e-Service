// Backend/routes/read.routes.js
const router = require('express').Router();
const ActivityCtrl = require('../controllers/activity.controller');
const authCookie = require('../middleware/auth');
const RequestCtrl  = require('../controllers/request.controller');

// Admin: ALL activities
router.get('/activities', ActivityCtrl.listAll);

// Student: ONLY my activities (username comes from JWT cookie)
router.get('/activities/mine', authCookie, ActivityCtrl.listMine);

// PUBLIC read (you chose no auth)
router.get('/activities', ActivityCtrl.listByUser);

// Update status (used by Process buttons)
router.patch('/activities/:requestId/status', ActivityCtrl.updateStatus);

// Details by requestId
router.get('/requests/:requestId', RequestCtrl.getByRequestId);



module.exports = router;
