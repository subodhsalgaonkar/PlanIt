import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyCalendar from "./components/Calendar";
import Signup from "./components/Authentication/Signup"; // Assuming Signup component is in components folder
import Login from "./components/Authentication/Login";
import Profile from "./components/Profile";
import LandingPage from "./components/Landing";
import Communities from "./components/Communities";

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mycalendar" element={<MyCalendar />} />
            <Route path="/communities" element={<Communities />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
