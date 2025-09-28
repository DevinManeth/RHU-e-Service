import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OngoingActivities from './pages/OngoingActivities.jsx';
import Help from './pages/help.jsx';
import ApplyTranscript from './pages/applyTranscript.jsx';
import Truecopy from './pages/Truecopy.jsx';
import JobOwners from './pages/JobOwners.jsx';
import LoginAs from './pages/LoginAs.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import DashBoard from './pages/DashBoard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Chatbot from './componets/ChatBot.jsx';
import AboutUs from './pages/AboutUs.jsx';
import IndustryStats from './pages/IndustryStats.jsx';
import NewRequest from './pages/newRequest.jsx';  
import Process from './pages/Process.jsx';
import Finished from './pages/Finished.jsx';
import RequestDetails from "./pages/RequestDetails.jsx";
import Technologies from './pages/Technologies.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login-as" element={<LoginAs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/help" element={<Chatbot/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/OngoingActivities" element={<OngoingActivities />} />
        <Route path="/ApplyTranscript" element={<ApplyTranscript/>} />
        <Route path="/Truecopy" element={<Truecopy/>} />
        <Route path="/JobOwners" element={<JobOwners/>} />
        <Route path="/IndustryStats" element={<IndustryStats/>} />
        <Route path="/newRequest" element={<NewRequest/>} /> 
        <Route path="/process" element={<Process/>} />
        <Route path="/finished" element={<Finished/>} />
        <Route path="/requests/:requestId" element={<RequestDetails />} />
          <Route path="/Technologies" element={<Technologies />} />                                             
      </Routes>
      <Chatbot/>
    </BrowserRouter>
  </StrictMode>,
)
