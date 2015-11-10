import { ADD_SONG, UPVOTE_SONG, NEXT_SONG } from './constants/ActionTypes';

const initialState = {
  queueSonglist: [],
  historySonglist: []
};

function queueSonglist(state = initialState.queueSonglist, action) {
  switch (action.type) {
  case ADD_SONG:
    return [
      ...state,
      {song_name: action.song, upvotes: 0}
    ];
  case UPVOTE_SONG:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index],
        {
          upvotes: state[action.index].upvotes + 1
        }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}


export default function mainReducer(state = initialState, action) {
  switch (action.type) {
  default:
    return {
      ...initialState,
      queueSonglist: queueSonglist(state.queueSonglist, action)
    };
  }
}
