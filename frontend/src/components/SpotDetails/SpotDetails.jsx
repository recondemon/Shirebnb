// frontend/src/components/SpotDetails/SpotDetails.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';
import { fetchReviewsBySpotId } from '../../store/reviews';
import ReviewModal from '../ReviewModal/ReviewModal';
import './spotDetails.css';

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spotReviews);
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotById(spotId));
    dispatch(fetchReviewsBySpotId(spotId)).then(() => setLoaded(true));
  }, [dispatch, spotId]);

  if (!loaded) return null;

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length).toFixed(2) : "New";

  const userHasReviewed = reviews.some((review) => review.userId === sessionUser?.id);
  const isOwner = spot.ownerId === sessionUser?.id;

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
        <div className="spot-details-host">
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p>{spot.description}</p>
        </div>
        <div className="callout-box">
          <p>
            <span className="price">${spot.price} per night</span>
            <span className="rating-info">⭐ {averageRating} {reviews.length > 0 && <span>&middot; {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>}</span>
          </p>
          <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
      </div>
      <div className="reviews-section">
        <h2>
          Reviews 
          <span>⭐ {averageRating}</span> 
          {reviews.length > 0 && <span>&middot; {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>}
        </h2>
        {sessionUser && !isOwner && !userHasReviewed && (
          <button className="post-review-button" onClick={() => setShowReviewModal(true)}>Post Your Review</button>
        )}
        {showReviewModal && <ReviewModal spotId={spotId} onClose={() => setShowReviewModal(false)} />}
        {reviews.length === 0 ? (
          <p>Be the first to post a review!</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="review">
              <div className="review-header">
                <p><strong>{review.User.firstName}</strong></p>
                <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
              </div>
              <p>{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SpotDetails;
