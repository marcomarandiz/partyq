import { SET_STATE, REQUEST_SONG } from '../common/constants/ActionTypes';

const initialState = {
  queue: { songlist: [], currentSong: null, isPlaying: false },
  history: { songlist: []}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_STATE:
    return action.state;
  case REQUEST_SONG:
  	// Check link
  	// get ID of song using API calls if necessary
  	// check if song is already in queue

  	// Different action possibly
  	// Get song information
  	// Add song to queue
  default:
    return state;
  }
}
