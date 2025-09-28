// controllers/request.controller.js
const Activity = require('../models/Activity');
// adjust model names/paths to your project:
const TranscriptRequest = require('../models/TranscriptRequest');
const TrueCopyRequest  = require('../models/TruecopyRequest');

exports.getByRequestId = async (req, res) => {
  try {
    const { requestId } = req.params;

    const activity = await Activity.findOne({ requestId }).lean();
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    let requestDoc = null;
    if (activity.type === 'transcript') {
      requestDoc = await TranscriptRequest.findOne({ requestId }).lean();
    } else if (activity.type === 'truecopy') {
      requestDoc = await TrueCopyRequest.findOne({ requestId }).lean();
    }

    if (!requestDoc) {
      // not a hard error — sometimes form is missing. Up to you.
      return res.json({ activity, request: null });
    }

    res.json({ activity, request: requestDoc });
  } catch (err) {
    console.error('getByRequestId error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
