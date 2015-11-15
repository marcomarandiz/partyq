import {SET_STATE} from '../common/constants/ActionTypes';
import setState from '../common/actions/setstate';

const initialState = {
  queue: { songlist: [], currentSong: null, isPlaying: false },
  history: { songlist: []}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_STATE:
    return action.state;
  default:
    return state;
  }
}
