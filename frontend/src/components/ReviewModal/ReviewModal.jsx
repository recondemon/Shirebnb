// frontend/src/components/ReviewModal/ReviewModal.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import './reviewModal.css';

function ReviewModal({ spotId, onClose }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (review.length < 10 || stars === 0) {
      setErrors({
        review: 'Review must be at least 10 characters.',
        stars: 'Stars must be between 1 and 5.',
      });
      return;
    }

    try {
      const newReview = await dispatch(createReview({ spotId, review, stars }));
      if (newReview) {
        onClose();
      }
    } catch (error) {
      const errorData = await error.json();
      setErrors(errorData.errors);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>How was your stay?</h2>
        {errors.review && <p className="error-message">{errors.review}</p>}
        {errors.stars && <p className="error-message">{errors.stars}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={stars >= star ? 'star selected' : 'star'}
                onClick={() => setStars(star)}
              >
                ★
              </span>
            ))}
            <label>Stars</label>
          </div>
          <button type="submit" disabled={review.length < 10 || stars === 0}>
            Submit Your Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
