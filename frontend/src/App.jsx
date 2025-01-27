import { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './auth/Register';

import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
