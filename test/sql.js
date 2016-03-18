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
  insertSongIntoSongs
} from '../server/utils/sqllib';

const song = {
  id: 123456789,
  src: 'youtube',
  title: 'Hello',
  artist: 'Adele',
  duration: 300
};

const conString = 'pg://' + process.env.USER + '@localhost/partyqtest';
console.log(conString);
pg.connect(conString, (err, client, done) => {
  describe('postgres tests', () => {
    it('connected to partyqtest database', () => {
      expect(err).to.equal(null);
    });
    // TODO: Make sure correct tables exist
    // Empties Tables
    client.query('DELETE FROM rooms');
    client.query('DELETE FROM songs');
    client.query('DELETE FROM room_songs');
    it('should not throw error', (finished) => {
      client.query(insertSongIntoSongs(song), (error, result) => {
        console.log(error);
        console.log(result);
        expect(error).to.equal(null);
        finished();
      });
    });
  });
});

