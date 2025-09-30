const fs = require('fs');
const path = require('path');

let nodemailer;
let PDFDocument;
try {
	nodemailer = require('nodemailer');
} catch (e) {
	// nodemailer missing
}
try {
	PDFDocument = require('pdfkit');
} catch (e) {
	// pdfkit missing
}

const TruecopyRequest = require('../models/TruecopyRequest');
const TranscriptRequest = require('../models/TranscriptRequest');
const Results = require('../models/Results');
const User = require('../models/User');
//const SentEmail = require('../models/SentEmail'); // optional logging

async function createCertificateBuffer(reqDoc) {
	return new Promise((resolve, reject) => {
		if (!PDFDocument) return reject(new Error('pdfkit is not installed'));
		const doc = new PDFDocument({ size: 'A4', margin: 50 });
		const bufs = [];
		doc.on('data', d => bufs.push(d));
		doc.on('end', () => resolve(Buffer.concat(bufs)));

		doc.fontSize(18).text('UNIVERSITY OF RUHUNA', { align: 'center' });
		doc.moveDown(0.2).fontSize(14).text('Office of the Registrar', { align: 'center' });
		doc.moveDown(1).fontSize(20).text('CERTIFIED TRUE COPY', { align: 'center' });

		doc.moveDown(2).fontSize(12);
		doc.text('This is to certify that the document(s) submitted by the applicant are true copies of the original.');
		doc.moveDown(1);
		doc.text(`Name: ${reqDoc.fullName || reqDoc.fullname || ''}`);
		doc.text(`Student ID: ${reqDoc.studentId || ''}`);
		doc.text(`Faculty: ${reqDoc.faculty || ''}`);
		doc.text(`Degree Program: ${reqDoc.degreeProgram || ''}`);
		if (reqDoc.graduationYear) doc.text(`Graduation Year: ${reqDoc.graduationYear}`);

		doc.moveDown(2).text('Certified by:');
		doc.moveDown(1).text('______________________________');
		doc.text('Registrar / Authorized Officer');

		doc.moveDown(2);
		doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`);

		doc.end();
	});
}

async function createTranscriptBuffer(username, resultsDoc, requestDoc) {
	return new Promise((resolve, reject) => {
		if (!PDFDocument) return reject(new Error('pdfkit is not installed'));
		const doc = new PDFDocument({ size: 'A4', margin: 50 });
		const bufs = [];
		doc.on('data', d => bufs.push(d));
		doc.on('end', () => resolve(Buffer.concat(bufs)));

		const name = (resultsDoc?.Name || resultsDoc?.name) || requestDoc?.fullName || username || '';
		const indexNo = resultsDoc?.IndexNo || resultsDoc?.indexNo || '';
		const degree = resultsDoc?.degree || requestDoc?.degreeName || '';

		doc.fontSize(18).text('University of Ruhuna', { align: 'center' });
		doc.moveDown(0.5).fontSize(14).text('Academic Transcript', { align: 'center' });
		doc.moveDown(1).fontSize(11);
		doc.text(`Name: ${name}`);
		doc.text(`Index No: ${indexNo}`);
		doc.text(`Degree Program: ${degree}`);

		doc.moveDown(1).fontSize(10);
		doc.text('Course', { continued: true });
		doc.text('Grade', { align: 'right' });
		doc.moveDown(0.5);

		const keys = Object.keys(resultsDoc || {}).filter(k => /^(COM|MAT|AMT)/i.test(k));
		if (keys.length === 0) {
			doc.text('No course records found.');
		} else {
			keys.forEach(k => {
				doc.text(k, { continued: true });
				doc.text(String(resultsDoc[k]), { align: 'right' });
			});
		}

		doc.moveDown(2);
		doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`);
		doc.end();
	});
}

exports.sendDocument = async (req, res) => {
	try {
		const { requestId } = req.body;
		if (!requestId) return res.status(400).json({ message: 'requestId is required' });

		let requestDoc = await TruecopyRequest.findOne({ requestId }).lean();
		let kind = 'truecopy';
		if (!requestDoc) {
			requestDoc = await TruecopyRequest.findById(requestId).lean().catch(() => null);
		}
		if (!requestDoc) {
			requestDoc = await TranscriptRequest.findOne({ requestId }).lean();
			kind = 'transcript';
			if (!requestDoc) requestDoc = await TranscriptRequest.findById(requestId).lean().catch(() => null);
		}
		if (!requestDoc) return res.status(404).json({ message: 'Request not found' });

		let recipient = requestDoc.email;
		if (!recipient && requestDoc.username) {
			const u = await User.findOne({ username: requestDoc.username }).lean();
			if (u?.email) recipient = u.email;
		}
		if (!recipient && requestDoc.studentId) {
			const u = await User.findOne({ studentId: requestDoc.studentId }).lean();
			if (u?.email) recipient = u.email;
		}
		if (!recipient) return res.status(400).json({ message: 'Recipient email not found for this request' });

		if (!nodemailer) return res.status(500).json({ message: 'nodemailer not installed' });

		const attachments = [];

		if (kind === 'truecopy' && requestDoc.degreeCopyPath) {
			const filename = path.basename(requestDoc.degreeCopyPath);
			const abs = path.join(__dirname, '..', 'uploads', filename);
			if (fs.existsSync(abs) && filename.toLowerCase().endsWith('.pdf')) {
				attachments.push({ filename, path: abs });
			}
		}

		if (attachments.length === 0) {
			if (kind === 'transcript') {
				const resultsDoc = await Results.findOne({ username: requestDoc.username }).lean().catch(() => null);
				const buffer = await createTranscriptBuffer(requestDoc.username, resultsDoc, requestDoc);
				attachments.push({ filename: `Transcript_${requestDoc.requestId || requestDoc.username}.pdf`, content: buffer });
			} else {
				const buffer = await createCertificateBuffer(requestDoc);
				attachments.push({ filename: `Certified_True_Copy_${requestDoc.requestId}.pdf`, content: buffer });
			}
		}

		let transporter;
		let usingEthereal = false;

		if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
			transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: parseInt(process.env.SMTP_PORT || '587'),
				secure: process.env.SMTP_SECURE === 'true',
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS
				}
			});
		} else {
			const testAccount = await nodemailer.createTestAccount();
			transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				auth: {
					user: testAccount.user,
					pass: testAccount.pass
				}
			});
			usingEthereal = true;
		}

		const mailOptions = {
			from: process.env.EMAIL_FROM || process.env.SMTP_USER,
			to: recipient,
			subject: `Document for request ${requestDoc.requestId || requestId}`,
			text: `Please find attached the requested document for request ${requestDoc.requestId || requestId}`,
			attachments,
		};

		const info = await transporter.sendMail(mailOptions);
		const result = { message: 'Email sent' };

		if (usingEthereal) {
			result.preview = nodemailer.getTestMessageUrl(info);
			console.log('Ethereal preview URL:', result.preview);
		}

		// Optional: Log email to DB
		// await SentEmail.create({ requestId: requestDoc.requestId, kind, recipient, sentAt: new Date() });

		return res.json(result);
	} catch (err) {
		console.error('sendDocument error:', err);
		return res.status(500).json({ message: 'Failed to send email', error: err.message });
	}
};
