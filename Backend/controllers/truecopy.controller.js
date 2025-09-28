const { v4: uuidv4 } = require('uuid');
const TruecopyRequest = require('../models/TruecopyRequest');
const Activity = require('../models/Activity');

function addDays(d, days) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + days);
  return dt;
}

exports.applyTruecopy = async (req, res) => {
  try {
    const {
      fullName,
      studentId,
      faculty,
      degreeProgram,
      graduationYear,
      email,
      contact,
      numberOfCopies,
      username
    } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'username is required' });
    }
    const degreeCopyPath     = req.files?.degreeCopy?.[0]?.path;
    const paymentReceiptPath = req.files?.paymentReceipt?.[0]?.path;

    if (!degreeCopyPath || !paymentReceiptPath) {
      return res.status(400).json({ message: 'Degree copy and payment receipt are required' });
    }

    //const username = req.user.username;
    const requestId = uuidv4();
    const subDate = new Date();
    const estDate = addDays(subDate, 14);
    const status = 'waiting';

    const doc = await TruecopyRequest.create({
      fullName,
      studentId,
      faculty,
      degreeProgram,
      graduationYear,
      email,
      contact,
      numberOfCopies,
      degreeCopyPath,
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
      desc: 'Request Trucopy degree certificate', // your required wording
      subDate,
      estDate,
      status,
      type: 'truecopy'
    });

    return res.status(201).json({ message: 'Truecopy submitted', requestId, request: doc });
  } catch (err) {
    console.error('applyTruecopy error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
