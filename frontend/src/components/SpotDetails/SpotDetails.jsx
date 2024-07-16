import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots';
import './spotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <p>Loading...</p>;

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
      <div className="images-section">
        <div className="large-image">
          {spot.SpotImages[0] && <img src={spot.SpotImages[0].url} alt="Spot" />}
        </div>
        <div className="small-images">
          {spot.SpotImages.slice(1, 5).map((image) => (
            <img key={image.id} src={image.url} alt="Spot" />
          ))}
        </div>
      </div>
      <div className="info-section">
        <div className="host-info">
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p>{spot.description}</p>
        </div>
        <div className="callout-box">
          <p>${spot.price} per night</p>
          <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
      </div>
      <div className="reviews-section">
        <p>⭐ {spot.avgStarRating} · {spot.numReviews} reviews</p>
        {spot.reviews && spot.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.firstName}</strong> {review.date}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotDetails;
