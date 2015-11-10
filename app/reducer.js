import { ADD_SONG, UPVOTE_SONG, NEXT_SONG } from './constants/ActionTypes';

export const initialState = {
  queueSonglist: [],
  historySonglist: []
};

function queueSonglistReducer(state = initialState.queueSonglist, action) {
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
  const { queueSonglist, currentSong, historySonglist } = state;
  switch (action.type) {
  case NEXT_SONG:
    const nextSong = queueSonglist[0];
    return {
      ...state,
      currentSong: nextSong,
      queueSonglist: queueSonglist.slice(1),
      historySonglist: [
        ...historySonglist,
        currentSong
      ]
    };
  default:
    return {
      ...initialState,
      queueSonglist: queueSonglistReducer(queueSonglist, action)
    };
  }
}
