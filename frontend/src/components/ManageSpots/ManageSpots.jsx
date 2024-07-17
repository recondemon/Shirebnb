// frontend/src/components/ManageSpots/ManageSpots.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserSpots, deleteSpot } from '../../store/spots';
import './manageSpots.css';

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSpots = useSelector((state) => state.spots.userSpots);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUserSpots(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  const handleDelete = (spotId) => {
    if (window.confirm("Are you sure you want to remove this spot?")) {
      dispatch(deleteSpot(spotId)).then(() => {
        alert("Spot successfully deleted");
      });
    }
  };

  if (!userSpots.length) {
    return (
      <div className="manage-spots-container">
        <h1>Manage Spots</h1>
        <Link to="/spots/new" className="create-spot-link">Create a New Spot</Link>
      </div>
    );
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      <div className="spots-list">
        {userSpots.map((spot) => (
          <div className="spot-tile" key={spot.id} onClick={() => navigate(`/spots/${spot.id}`)}>
            <img src={spot.previewImage} alt={spot.name} />
            <div className="spot-info">
              <p>{spot.city}, {spot.state}</p>
              <p>${spot.price} / night</p>
              <p>⭐ {spot.avgRating}</p>
            </div>
            <div className="spot-actions">
              <button onClick={(e) => { e.stopPropagation(); navigate(`/spots/${spot.id}/edit`); }}>Update</button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(spot.id); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;
