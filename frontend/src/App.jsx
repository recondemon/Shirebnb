import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotDetails from './components/SpotDetails';
import Header from './components/Header';
import CreateSpotPage from './components/CreateSpot/CreateSpotPage';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpotPage from './components/UpdateSpot/UpdateSpotPage';
import MoreSpots from './components/MoreSpots/MoreSpots';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

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
        <Route path="/spots/:spotId/edit" element={<UpdateSpotPage />} /> 
        <Route path="/spots/state/:region" element={<MoreSpots />} />
      </Routes>
    </>
  );
}

export default App;
