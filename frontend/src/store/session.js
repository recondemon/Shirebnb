// frontend/src/store/session.js

import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/setSessionUser';
const REMOVE_SESSION_USER = 'session/removeSessionUser';

// Action creators
const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  user,
});

const removeSessionUser = () => ({
  type: REMOVE_SESSION_USER,
});

// Thunk action for logging in
export const login = (credential, password) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

// Thunk action for restoring user session
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

// Initial state
const initialState = { user: null };

// Session reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_USER:
      return { ...state, user: action.user };
    case REMOVE_SESSION_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
export { setSessionUser, removeSessionUser };
