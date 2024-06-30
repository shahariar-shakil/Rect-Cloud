import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import './customCSS/custom-scrollbar.css'; // Import the custom scrollbar CSS


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
