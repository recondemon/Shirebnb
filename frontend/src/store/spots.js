// Store Update: spots.js

import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_SPOT_DETAILS = 'spots/setSpotDetails';

const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSpotDetails = (spot) => ({
  type: SET_SPOT_DETAILS,
  spot,
});

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.Spots));
    return data;
  } else {
    console.log("something went wrong");
  }
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpotDetails(data));
    return data;
  } else {
    console.error('Failed to fetch spot details');
  }
};

const initialState = {
  allSpots: [],
  currentSpot: null,
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return {
        ...state,
        allSpots: action.spots,
      };
    case SET_SPOT_DETAILS:
      return {
        ...state,
        currentSpot: action.spot,
      };
    default:
      return state;
  }
};

export default spotsReducer;
