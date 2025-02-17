import React from 'react';
import PropertyList from './components/PropertyList';

function App() {
    return (
        <div>
            <PropertyList />
        </div>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

