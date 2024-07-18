import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_SINGLE_SPOT = 'spots/setSingleSpot';
const SET_USER_SPOTS = 'spots/setUserSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  spot,
});

const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  spots,
});

const addSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

const removeSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.Spots));
  } else {
    console.log("something went wrong");
  }
};

export const fetchSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setSingleSpot(spot));
  } else {
    console.log("something went wrong");
  }
};

export const fetchUserSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  if (response.ok) {
    const data = await response.json();
    dispatch(setUserSpots(data.Spots));
  } else {
    console.log("something went wrong");
  }
};

export const createSpot = (spotData) => async (dispatch) => {
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
    return spot;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
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

export const deleteSpot = (spotId) => async (dispatch) => {
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
        allSpots: state.allSpots.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
        singleSpot: action.spot,
        userSpots: state.userSpots.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
      };
    case DELETE_SPOT:
      return {
        ...state,
        allSpots: state.allSpots.filter((spot) => spot.id !== action.spotId),
        userSpots: state.userSpots.filter((spot) => spot.id !== action.spotId),
      };
    default:
      return state;
  }
};

export default spotsReducer;
