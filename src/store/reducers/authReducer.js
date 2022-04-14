import {LOGIN, LOGIN_ERRORS} from '../actions/actionTypes';
const openState = {
    error: '',
    token: '',
  };

  export const authReducer = (state = openState, action) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, token: action.token};
      case LOGIN_ERRORS:
        return { ...state, errors: action.errors};
      default:
        return openState;
    }
  };
