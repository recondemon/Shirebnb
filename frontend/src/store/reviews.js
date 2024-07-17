import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const fetchReviewsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews.Reviews));
  }
};

const initialState = { spotReviews: [] };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, spotReviews: action.reviews };
    default:
      return state;
  }
};

export default reviewsReducer;