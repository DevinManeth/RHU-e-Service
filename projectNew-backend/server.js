const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user data


// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validUser = {
    username: 'ED/1200',
    password: '1234'
  };

  if (username !== validUser.username) {
    res.json({ success: false, message: 'Your username is invalid' });
  } else if (password !== validUser.password) {
    res.json({ success: false, message: 'Your password is incorrect' });
  } else {
    res.json({ success: true, message: 'Login successful' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
