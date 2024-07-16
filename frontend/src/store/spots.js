

import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';

const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

export const fetchSpots = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots');

    if (response.ok) {

    const data = await response.json();

    console.log('data:', data);

    dispatch(setSpots(data.Spots));
    return data
    } else{
// error handeling logic below
console.log("something went wrong")
}

};

const initialState = {
  allSpots: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return {
        ...state,
        allSpots: action.spots,
      };
    default:
      return state;
  }
};

export default spotsReducer;
