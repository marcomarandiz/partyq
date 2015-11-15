// TODO: Again, should abstract this into common file
export const SET_STATE = 'SET_STATE';

// TODO: Put in common file
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

// TODO: Move this into a 'common' file so both front and backend can access.
const initialState = {
  queue: { songlist: [], currentSong: null, isPlaying: false },
  history: { songlist: []}
};;

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_STATE:
    return action.state;
  default:
    console.log('ACTION RECEIVED', action);
    return state;
  }
}
