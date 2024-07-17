import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';
import './spotDetails.css';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotById(spotId)).then(() => setLoaded(true));
  }, [dispatch, spotId]);

  if (!loaded) return null;

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <div className="spot-images-grid">
        {spot.SpotImages && spot.SpotImages.length > 0 && (
          <>
            <div className="spot-large-image">
              <img src={spot.SpotImages[0].url} alt={`${spot.name} large`} />
            </div>
            {spot.SpotImages.slice(1, 5).map((image, idx) => (
              <div key={idx} className="spot-small-image">
                <img src={image.url} alt={`${spot.name} small ${idx}`} />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="spot-details-info">
        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <p>{spot.description}</p>
        <div className="callout-box">
          <p>${spot.price} per night</p>
          <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
      </div>
    </div>
  );
}

export default SpotDetails;
