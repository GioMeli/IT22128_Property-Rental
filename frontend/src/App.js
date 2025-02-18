import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home"; // <-- Make sure you have a Home.js component
import ContactUs from "./ContactUs";
import ApplicationForm from "./ApplicationForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route => Login page */}
        <Route path="/" element={<Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Home page => after login */}
        <Route path="/home" element={<Home />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/application-form" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
