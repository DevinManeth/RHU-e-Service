// import React from 'react';
// import LoginPage from './LoginPage';

// function App() {
//   return <LoginPage />;
// }

// export default App;



// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage'; // You’ll create this file if not already

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

