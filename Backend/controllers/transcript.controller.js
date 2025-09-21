const { v4: uuidv4 } = require('uuid');
const TranscriptRequest = require('../models/TranscriptRequest');
const Activity = require('../models/Activity');

function addDays(d, days) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + days);
  return dt;
}

exports.applyTranscript = async (req, res) => {
  try {
    // fields from form
    const {
      fullName,
      address,
      email,
      registrationNumber,
      yearOfAdmission,
      contactNumber,
      degreeName,
      numberOfCopies,
      effectiveDate,
      username
    } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'username is required' });
        }
    // file from multer
    const paymentReceiptPath = req.file?.path;
    if (!paymentReceiptPath) {
      return res.status(400).json({ message: 'Payment receipt file is required' });
    }

    //const username = req.user.username;         // from JWT
    const requestId = uuidv4();                 // unique request id
    const subDate = new Date();
    const estDate = addDays(subDate, 14);       // adjust as needed
    const status = 'waiting';

    const doc = await TranscriptRequest.create({
      fullName,
      address,
      email,
      registrationNumber,
      yearOfAdmission,
      contactNumber,
      degreeName,
      numberOfCopies,
      effectiveDate,
      paymentReceiptPath,
      username,
      requestId,
      subDate,
      estDate,
      status
    });

    await Activity.create({
      username,
      requestId,
      desc: 'Request transcript',
      subDate,
      estDate,
      status,
      type: 'transcript'
    });

    return res.status(201).json({ message: 'Transcript submitted', requestId, request: doc });
  } catch (err) {
    console.error('applyTranscript error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
