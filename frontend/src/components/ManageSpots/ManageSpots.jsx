import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserSpots, deleteSpot } from '../../store/spots';
import './manageSpots.css';
import { Link } from 'react-router-dom';

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSpots = useSelector((state) => state.spots.userSpots);
  const sessionUser = useSelector((state) => state.session.user);
  const [imageError, setImageError] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchUserSpots());
    }
  }, [dispatch, sessionUser]);

  const handleDelete = (spotId) => {
    setShowModal(true);
    setSpotToDelete(spotId);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteSpot(spotToDelete));
      setShowModal(false);
      setSpotToDelete(null);
    } catch (error) {
      console.error('Failed to delete spot:', error);
    }
  };

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
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
      <div className="spots-grid">
        {userSpots.map((spot) => (
          <div
            className="spot"
            key={spot.id}
            onClick={() => navigate(`/spots/${spot.id}`)}
          >
            <div className="image-container">
              {imageError[spot.id] ? (
                <div className="image-placeholder">Image failed to load</div>
              ) : (
                <img
                  src={spot.previewImage}
                  alt={spot.name}
                  onError={() => handleImageError(spot.id)}
                />
              )}
            </div>
            <div className="spot-info">
              <div className="spot-details">
                <p>{spot.city}, {spot.state}</p>
                <p className="star-rating">⭐ {spot.avgRating}</p>
              </div>
              <p className="spot-price">${spot.price} per night</p>
            </div>
            <div className="spot-actions">
              <button onClick={(e) => { e.stopPropagation(); navigate(`/spots/${spot.id}/edit`); }}>Update</button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(spot.id); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to remove this spot?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Keep</button>
              <button onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
