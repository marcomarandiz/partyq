import {expect} from 'chai';
import reducer from '../reducer';
import { addSong } from '../actions/queue';
import { upvoteSong } from '../actions/song';
import { playSong, pauseSong } from '../actions/currentSong';
import nextSong from '../actions/nextSong';
import { initialState as emptyState } from '../reducer';

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
        vid: 'song-one',
        upvotes: 0
      },
      queueSonglist: [
        {
          vid: 'song-two',
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
          vid: 'song-one',
          upvotes: 0
        }
      ],
      currentSong: {
        vid: 'song-two',
        upvotes: 0
      },
      queueSonglist: []
    });
  });

  it('handles ADD_SONG when no current song', () => {
    const action = addSong('song-one');

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      ...emptyState,
      currentSong: {vid: 'song-one', isPlaying: false}
    });
  });

  it('handles ADD_SONG when there is a currentSong', () => {
    const action = addSong('song-one');
    const intitialState = {
      ...emptyState,
      currentSong: {vid: 'current', isPlaying: false}
    };

    const nextState = reducer(intitialState, action);

    expect(nextState).to.deep.equal({
      ...intitialState,
      queueSonglist: [{vid: 'song-one', upvotes: 0}]
    });
  });

  it('upvotes song with UPVOTE_SONG', () => {
    const initialState = {
      ...emptyState,
      currentSong: {vid: 'current', isPlaying: false},
      queueSonglist: [
        {
          vid: 'song', upvotes: 0
        }
      ]
    };
    const action = upvoteSong(0);
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      queueSonglist: [
        {
          vid: 'song', upvotes: 1
        }
      ]
    });
  });

  it('plays song if there is current song and it is not playing', () => {
    const initialState = {
      ...emptyState,
      currentSong: {vid: 'current', isPlaying: false}
    };
    const action = playSong();
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      currentSong: {vid: 'current', isPlaying: true}
    });
  });

  it('pauses song if there is current song and it is playing', () => {
    const initialState = {
      ...emptyState,
      currentSong: {vid: 'current', isPlaying: true}
    };
    const action = pauseSong();
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      currentSong: {vid: 'current', isPlaying: false}
    });
  });
});
