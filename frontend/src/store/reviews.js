import { csrfFetch } from './csrf';

const SET_REVIEWS = 'reviews/setReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const setReviews = reviews => ({
	type: SET_REVIEWS,
	reviews,
});

const addReview = review => ({
	type: ADD_REVIEW,
	review,
});

const removeReview = reviewId => ({
	type: DELETE_REVIEW,
	reviewId,
});

export const fetchReviewsBySpotId = spotId => async dispatch => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(setReviews(data.Reviews));
	} else {
		console.log('something went wrong');
	}
};

export const createReview =
	({ spotId, review, stars }) =>
	async dispatch => {
		const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
			method: 'POST',
			body: JSON.stringify({ review, stars }),
		});

		if (response.ok) {
			const newReview = await response.json();
			dispatch(addReview(newReview));
			return newReview;
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message);
		}
	};

export const deleteReview = reviewId => async dispatch => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(removeReview(reviewId));
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}
};

const initialState = {
	spotReviews: [],
};

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_REVIEWS:
			return {
				...state,
				spotReviews: action.reviews,
			};
		case ADD_REVIEW:
			return {
				...state,
				spotReviews: [action.review, ...state.spotReviews],
			};
		case DELETE_REVIEW:
			return {
				...state,
				spotReviews: state.spotReviews.filter(
					review => review.id !== action.reviewId
				),
			};
		default:
			return state;
	}
};

export default reviewsReducer;
