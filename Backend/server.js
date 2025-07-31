const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');

const loginRoute = require('./routes/loginRoute');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();


// Login endpoint
app.use('/api', loginRoute);
app.use('/api', loginRoute);


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
