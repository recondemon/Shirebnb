import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_SINGLE_SPOT = 'spots/setSingleSpot';
const SET_USER_SPOTS = 'spots/setUserSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const ADD_IMAGE_TO_SPOT = 'spots/addImageToSpot';
const UPLOAD_TEMPORARY_IMAGE = 'spots/uploadTemporaryImage';

// Action Creators
const setSpots = spots => ({
	type: SET_SPOTS,
	spots,
});

const setSingleSpot = spot => ({
	type: SET_SINGLE_SPOT,
	spot,
});

const setUserSpots = spots => ({
	type: SET_USER_SPOTS,
	spots,
});

const addSpot = spot => ({
	type: CREATE_SPOT,
	spot,
});

const editSpot = spot => ({
	type: UPDATE_SPOT,
	spot,
});

const removeSpot = spotId => ({
	type: DELETE_SPOT,
	spotId,
});

const addImage = (spotId, image) => ({
	type: ADD_IMAGE_TO_SPOT,
	spotId,
	image,
});

// Thunks
export const fetchSpots = () => async dispatch => {
	const response = await csrfFetch('/api/spots');
	if (response.ok) {
		const data = await response.json();
		console.log('Fetched spots:', data.Spots);
		dispatch(setSpots(data.Spots));
	} else {
		console.log('something went wrong');
	}
};

export const fetchSpotById = spotId => async dispatch => {
	const response = await csrfFetch(`/api/spots/${spotId}`);
	if (response.ok) {
		const spot = await response.json();
		dispatch(setSingleSpot(spot));
	} else {
		console.log('something went wrong');
	}
};

export const fetchUserSpots = () => async dispatch => {
	const response = await csrfFetch('/api/spots/current');
	if (response.ok) {
		const data = await response.json();
		dispatch(setUserSpots(data.Spots));
	} else {
		console.log('something went wrong');
	}
};

export const createSpot = spotData => async dispatch => {
	const response = await csrfFetch('/api/spots', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(spotData),
	});

	if (response.ok) {
		const spot = await response.json();
		dispatch(addSpot(spot));
		dispatch(fetchSpots());
		return spot;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}
};

export const uploadTemporaryImage = file => async dispatch => {
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await csrfFetch('/api/spots/images/temporary-upload', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(addImage(data.url, data.tempId));
			return { url: data.url, tempId: data.tempId };
		} else {
			const errorData = await response.json();
			console.error('Error uploading image:', errorData.message);
			throw new Error(errorData.message || 'Failed to upload image');
		}
	} catch (error) {
		console.error('Error uploading image:', error.message);
		throw error;
	}
};

export const addImageToSpot = (spotId, imageData) => async dispatch => {
	try {
		let response;

		if (imageData.file) {
			// If it's a file, upload the image
			const formData = new FormData();
			formData.append('image', imageData.file);

			response = await csrfFetch(`/api/spots/${spotId}/images/upload`, {
				method: 'POST',
				body: formData,
			});
		} else {
			// If it's a URL, directly add the image URL
			response = await csrfFetch(`/api/spots/${spotId}/images`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(imageData),
			});
		}

		if (response.ok) {
			const image = await response.json();
			dispatch(addImage(spotId, image));
			return image;
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message);
		}
	} catch (error) {
		console.error('Error adding image to spot:', error.message);
		throw error;
	}
};

export const updateSpot = (spotId, spotData) => async dispatch => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(spotData),
	});

	if (response.ok) {
		const spot = await response.json();
		dispatch(editSpot(spot));
		return spot;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}
};

export const deleteSpot = spotId => async dispatch => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		dispatch(removeSpot(spotId));
		return true;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message);
	}
};

// Initial State
const initialState = {
	allSpots: [],
	singleSpot: {},
	userSpots: [],
};

// Reducer
const spotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SPOTS:
			return {
				...state,
				allSpots: action.spots,
			};
		case SET_SINGLE_SPOT:
			return {
				...state,
				singleSpot: action.spot,
			};
		case SET_USER_SPOTS:
			return {
				...state,
				userSpots: action.spots,
			};
		case CREATE_SPOT:
			return {
				...state,
				allSpots: [action.spot, ...state.allSpots],
				userSpots: [action.spot, ...state.userSpots],
			};
		case UPDATE_SPOT:
			return {
				...state,
				allSpots: state.allSpots.map(spot =>
					spot.id === action.spot.id ? action.spot : spot
				),
				singleSpot: action.spot,
				userSpots: state.userSpots.map(spot =>
					spot.id === action.spot.id ? action.spot : spot
				),
			};
		case DELETE_SPOT:
			return {
				...state,
				allSpots: state.allSpots.filter(spot => spot.id !== action.spotId),
				userSpots: state.userSpots.filter(spot => spot.id !== action.spotId),
			};
		case ADD_IMAGE_TO_SPOT:
			return {
				...state,
				singleSpot: {
					...state.singleSpot,
					SpotImages: state.singleSpot.SpotImages
						? [...state.singleSpot.SpotImages, action.image]
						: [action.image],
				},
				allSpots: state.allSpots.map(spot =>
					spot.id === action.spotId
						? {
								...spot,
								SpotImages: spot.SpotImages
									? [...spot.SpotImages, action.image]
									: [action.image],
							}
						: spot
				),
			};
		case UPLOAD_TEMPORARY_IMAGE:
			return {
				...state,
				// If you want to store the uploaded images in your state:
				temporaryImages: state.temporaryImages
					? [...state.temporaryImages, action.image]
					: [action.image],
			};
		default:
			return state;
	}
};

export default spotsReducer;
