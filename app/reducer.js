import { ADD_SONG, UPVOTE_SONG, NEXT_SONG, PLAY_SONG, PAUSE_SONG } from './constants/ActionTypes';

export const initialState = {
  queueSonglist: [],
  historySonglist: [],
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
    ].sort((a, b) => b.upvotes - a.upvotes);
  default:
    return state;
  }
}

function currentSongReducer(state = initialState.currentSong, action) {
  switch (action.type) {
  case PLAY_SONG:
    return {
      ...state,
      isPlaying: true
    };
  case PAUSE_SONG:
    return {
      ...state,
      isPlaying: false
    };
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
    if (state.currentSong && Object.keys(state.currentSong).length !== 0 ) {
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
  case ADD_SONG:
    if (!state.currentSong || Object.keys(state.currentSong).length === 0) {
      return {
        ...state,
        currentSong: {song_name: action.song, isPlaying: false}
      };
    }
    /* FALLTHROUGH */
  default:
    return {
      ...initialState,
      queueSonglist: queueSonglistReducer(queueSonglist, action),
      currentSong: currentSongReducer(currentSong, action),
      historySonglist
    };
  }
}
