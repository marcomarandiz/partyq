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

    describe('insert song', () => {
      it('should not throw error', (finished) => {
        client.query(insertSongIntoSongs(song), (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });

      it('should return a song', (finished) => {
        client.query(getSongBySid(song.id), (error, result) => {
          expect(result.rows).to.deep.equal([{
            sid: 123456789,
            source: 'youtube',
            title: 'Hello',
            artist: 'Adele',
            duration: 300
          }]);
          finished();
        });
      });
    });

    describe('insert room', () => {
      it('should not throw error', (finished) => {
        const creator =  'steve';
        const roomName = 'jd2211';
        client.query(insertNewRoom(creator, roomName), (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });

      it('should return a row', (finished) => {
        client.query('SELECT * FROM rooms', (error, result) => {
          expect(result.rowCount).to.equal(1);
          expect(result.rows[0].creator).to.equal('steve');
          expect(result.rows[0].name).to.equal('jd2211');
          finished();
        });
      });
    });
    



  });
});

