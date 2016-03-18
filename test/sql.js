/* eslint "no-unused-expressions": 0 */

import {expect } from 'chai';
import pg from 'pg';
import {
  getSidsFromRoomSongs,
  getSongBySid,
  getUpvotesFromRoomSongs,
  getSkipVotesFromRoomSongs,
  getNameFromRooms,
  insertNewRoom,
  insertIntoRoomSongs,
  insertSongsIntoSongs
} from '../common/utils/functions';

const conString = 'pg://' + process.env.USER + '@localhost/partyqtest';
pg.connect(conString, (err, client, done) => {
  describe('postgres tests', () => {
    it('connected to partyqtest database', () => {
      expect(err).to.equal(null);
    });
  });
});

