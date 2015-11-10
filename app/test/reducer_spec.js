import {expect} from 'chai';
import reducer from '../reducer';
import { addSong } from '../actions/queue';
import { upvoteSong } from '../actions/song';
import nextSong from '../actions/nextSong';
import { initialState as emptyState} from '../reducer';

describe('reducer', () => {
  it('does nothing when called NEXT_SONG with no current song', () => {
    const action = nextSong();

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal(emptyState);
  });

  it('handles NEXT_SONG when there is a current song', () => {
    const initialState = {
      ...emptyState,
      currentSong: {
        song_name: 'song-one',
        upvotes: 0
      },
      queueSonglist: [
        {
          song_name: 'song-two',
          upvotes: 0
        }
      ]
    };
    const action = nextSong();

    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      historySonglist: [
        {
          song_name: 'song-one',
          upvotes: 0
        }
      ],
      currentSong: {
        song_name: 'song-two',
        upvotes: 0
      },
      queueSonglist: []
    });
  });


  it('handles ADD_SONG', () => {
    const action = addSong('song-one');

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      ...emptyState,
      queueSonglist: [{song_name: 'song-one', upvotes: 0}]
    });
  });

  it('upvotes song with UPVOTE_SONG', () => {
    const initialState = {
      ...emptyState,
      queueSonglist: [
        {
          song_name: 'song', upvotes: 0
        }
      ]
    };
    const action = upvoteSong(0);
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      queueSonglist: [
        {
          song_name: 'song', upvotes: 1
        }
      ]
    });
  });
});
