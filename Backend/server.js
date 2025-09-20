const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');

const loginRoute = require('./routes/loginRoute');
const jobOwnerRoute = require("./routes/jobOwnerRoute");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ✅ Your React app URL
  credentials: true                // ✅ Allow sending cookies
}));
app.use(bodyParser.json());
app.use(cookieParser()); // ✅ Enable cookies

connectDB();


// Login endpoint
app.use('/api', loginRoute);

app.use("/api", jobOwnerRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
