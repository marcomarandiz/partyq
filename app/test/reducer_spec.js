import {expect} from 'chai';
import reducer from '../reducer';
import { addSong } from '../actions/queue';

describe('reducer', () => {
  it('handles ADD_SONG', () => {
    const action = addSong('song-one');

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      queueSonglist: [{song_name: "song-one", upvotes: 0}]
    });
  });
});
