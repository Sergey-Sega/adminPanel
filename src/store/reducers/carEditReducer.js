/* eslint-disable max-len */
import { CAR_EDIT } from '../actions/actionTypes';
const openState = {
    data: {},
  };

  export const carEditReducer = (state = openState, action) => {
    switch (action.type) {
      case CAR_EDIT:
        return { ...state, data: action.data};
      default:
        return openState;
    }
  };
