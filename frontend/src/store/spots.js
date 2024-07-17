import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_SINGLE_SPOT = 'spots/setSingleSpot';

const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  spot,
});

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

const initialState = {
  allSpots: [],
  singleSpot: {},
};

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
    default:
      return state;
  }
};

export default spotsReducer;
