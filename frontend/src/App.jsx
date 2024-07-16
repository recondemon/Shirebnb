import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotDetails from './components/SpotDetails';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/signup" element={<SignupFormPage />} />
        <Route path="/spots/:spotId" element={<SpotDetails />} />
      </Routes>
    </>
  );
}

export default App;
