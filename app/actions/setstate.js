import * as types from '../constants/ActionTypes';

export default function setState(state) {
  return {
    type: types.SET_STATE,
    state
  };
}
