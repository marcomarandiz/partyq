import {expect} from 'chai';
import reducer from '../reducer';
import { addSong } from '../../common/actions/queue';
import { upvoteSong } from '../../common/actions/song';
import { playSong, pauseSong } from '../../common/actions/currentSong';
import nextSong from '../../common/actions/nextSong';
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
      queue: {
        currentSong: {
          vid: 'song-one',
          upvotes: 0
        },
        songlist: [
          {
            vid: 'song-two',
            upvotes: 0
          }
        ]
      }
    };

    const action = nextSong();
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      history: {songlist: [
        {
          vid: 'song-one',
          upvotes: 0
        }
      ]},
      queue: {
        currentSong: {
          vid: 'song-two',
          upvotes: 0
        },
        songlist: []
      }
    });
  });

  it('handles ADD_SONG when no current song', () => {
    const action = addSong('https://www.youtube.com/watch?v=PofT3QGSkOo');

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      ...emptyState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'https://www.youtube.com/watch?v=PofT3QGSkOo',
          vid: 'PofT3QGSkOo',
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null,
          thumbnail: null
        },
        isPlaying: false,
        songlist: []
      }
    });
  });

  it('handles ADD_SONG when there is a currentSong', () => {
    const action = addSong('https://www.youtube.com/watch?v=PofT3QGSkOo');
    const intitialState = {
      ...emptyState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
          vid: 'nfWlot6h_JM',
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        songlist: [],
      }
    };

    const nextState = reducer(intitialState, action);

    expect(nextState).to.deep.equal({
      ...intitialState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
          vid: 'nfWlot6h_JM',
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        songlist: [{
          title: null,
          artist: null,
          url: 'https://www.youtube.com/watch?v=PofT3QGSkOo',
          vid: 'PofT3QGSkOo',
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null,
          thumbnail: null
        }],
      }
    });
  });

  it('upvotes song with UPVOTE_SONG', () => {
    const initialState = {
      ...emptyState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        songlist: [{
          title: null,
          artist: null,
          url: 'song-one',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        }]
      }
    };
    const action = upvoteSong(0);
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      queue: {
        songlist: [{
          title: null,
          artist: null,
          url: 'song-one',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 1,
          duration: null
        }],
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        }
      }
    });
  });

  it('plays song if there is current song and it is not playing', () => {
    const initialState = {
      ...emptyState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
      }
    };
    const action = playSong();
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        isPlaying: true
      }
    });
  });

  it('pauses song if there is current song and it is playing', () => {
    const initialState = {
      ...emptyState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        isPlaying: true
      }
    };
    const action = pauseSong();
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      ...initialState,
      queue: {
        currentSong: {
          title: null,
          artist: null,
          url: 'current',
          vid: null,
          src: null,
          uploadDate: null,
          upvotes: 0,
          duration: null
        },
        isPlaying: false
      }
    });
  });
});
