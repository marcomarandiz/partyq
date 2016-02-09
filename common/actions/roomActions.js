import * as types from '../constants/ActionTypes';

export function createRoom(roomname) {
  return {
    type: types.CREATE_ROOM,
    roomname
  };
}

export function joinRoom(roomname) {
  return {
    type: types.JOIN_ROOM,
    roomname
  };
}
