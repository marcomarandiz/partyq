import * as types from '../constants/ActionTypes';

export function createRoom(name) {
  return {
    type: types.CREATE_ROOM,
    name
  };
}

export function joinRoom(name) {
  return {
    type: types.JOIN_ROOM,
    name
  };
}
