import {expect} from 'chai';

import reducer from '../reducer';

describe('reducer', () => {
  it('handles ADD_SONG', () => {
    const action = {
      type: 'ADD_SONG',
      song: 'song-one'
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.deep.equal({
      queueSonglist: ['song-one']
    });
  });
});
