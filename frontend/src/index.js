// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';    // If you have an index.css file
import App from './App'; // Assuming you have an App.js

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to measure performance (optional):
reportWebVitals();
