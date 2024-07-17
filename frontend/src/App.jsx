// frontend/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotDetails from './components/SpotDetails';
import Header from './components/Header';
import CreateSpotPage from './components/CreateSpot/CreateSpotPage';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpotPage from './components/UpdateSpot/UpdateSpotPage'; // Create this component

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/signup" element={<SignupFormPage />} />
        <Route path="/spots/new" element={<CreateSpotPage />} />
        <Route path="/spots/:spotId" element={<SpotDetails />} />
        <Route path="/manage-spots" element={<ManageSpots />} />
        <Route path="/spots/:spotId/edit" element={<UpdateSpotPage />} /> {/* Create this component */}
      </Routes>
    </>
  );
}

export default App;
