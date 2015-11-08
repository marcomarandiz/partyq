import {expect} from 'chai';
import reducer from '../reducer';
import { addSong } from '../actions/queue';
import { upvoteSong } from '../actions/song';

describe('reducer', () => {
  it('handles ADD_SONG', () => {
    const action = addSong('song-one');

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      queueSonglist: [{song_name: 'song-one', upvotes: 0}]
    });
  });

  it('upvotes song with UPDATE_SONG', () => {
    const initialState = {
      queueSonglist: [
        {
          song_name: 'song', upvotes: 0
        }
      ]
    };
    const action = upvoteSong(0);
    const nextState = reducer(initialState, action);


    expect(nextState).to.deep.equal({
      queueSonglist: [
        {
          song_name: 'song', upvotes: 1
        }
      ]
    });
  });
});
