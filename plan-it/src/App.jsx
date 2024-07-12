import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyCalendar from "./components/Calendar";
import Signup from "./components/Authentication/Signup"; // Assuming Signup component is in components folder

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<MyCalendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
