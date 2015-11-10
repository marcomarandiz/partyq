import { ADD_SONG, UPVOTE_SONG, NEXT_SONG } from './constants/ActionTypes';

export const initialState = {
  queueSonglist: [],
  historySonglist: [],
  currentSong: {song: {}, isPlaying: false}
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
    // TODO: Move this out of NEXT_SONG and into own function
    let newState = state;
    if (state.currentSong) {
      let nextSong = {};
      if (state.queueSonglist.length > 0) {
        nextSong = queueSonglist[0];
      }

      newState = {
        ...state,
        currentSong: nextSong,
        queueSonglist: queueSonglist.slice(1),
        historySonglist: [
          ...historySonglist,
          currentSong
        ]
      };
    }
    return newState;
  default:
    return {
      ...initialState,
      queueSonglist: queueSonglistReducer(queueSonglist, action)
    };
  }
}
