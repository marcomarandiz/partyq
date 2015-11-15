import {
  ADD_SONG,
  UPVOTE_SONG,
  NEXT_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  SET_STATE
} from '../common/constants/ActionTypes';

export const initialState = {
  queue: { songlist: [], currentSong: null, isPlaying: false },
  history: { songlist: []}
};

function queueReducer(state = initialState.queue, action) {
  const queueSonglist = state.songlist;
  const currentSong = state.currentSong;
  switch (action.type) {
  case ADD_SONG:
    if (!currentSong || Object.keys(currentSong).length === 0) {
      return {
        ...state,
        currentSong: {
          title: null,
          artist: null,
          url: action.url,
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        }
      };
    }
    return {
      ...state,
      songlist: [
        ...queueSonglist,
        {
          title: null,
          artist: null,
          url: action.url,
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        }
      ]
    };
  case UPVOTE_SONG:
    return {
      ...state,
      songlist: [
        ...queueSonglist.slice(0, action.index),
        Object.assign({}, queueSonglist[action.index],
          {
            upvotes: queueSonglist[action.index].upvotes + 1
          }),
        ...queueSonglist.slice(action.index + 1)
      ].sort((a, b) => b.upvotes - a.upvotes)
    };
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
  const { queue, history } = state;
  const queueSonglist = queue.songlist;
  const currentSong = queue.currentSong;
  const historySonglist = history.songlist;
  switch (action.type) {
  case SET_STATE:
    return action.state;
  case NEXT_SONG:
    // TODO: Move this out of NEXT_SONG and into own function
    let newState = state;
    if (currentSong && Object.keys(currentSong).length !== 0 ) {
      let nextSong = {};
      if (queueSonglist.length > 0) {
        nextSong = queueSonglist[0];
      }

      newState = {
        ...state,
        queue: {currentSong: nextSong, songlist: queueSonglist.slice(1)},
        history: {songlist:
        [
          ...historySonglist,
          currentSong
        ]}
      };
    }
    return newState;
  default:
    return {
      ...initialState,
      queue: queueReducer(queue, action),
      history
    };
  }
}
