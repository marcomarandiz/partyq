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
  insertSongIntoSongs,
  getRoomIdFromRoomName
} from '../server/utils/sqllib';

const song = {
  id: 123456789,
  src: 'youtube',
  title: 'Hello',
  artist: 'Adele',
  duration: 300
};

const creator = 'steve';
const roomName = 'jd2211';

const conString = 'pg://' + process.env.USER + '@localhost/partyqtest';
pg.connect(conString, (err, client, done) => {

  describe('postgres tests', () => {
    it('connected to partyqtest database', () => {
      expect(err).to.equal(null);
    });

    // TODO: Make sure correct tables exist

    // Empties Tables
    describe('clear tables', () => {

      // room_songs has to be deleted first
      // Otherwise you can't delete the other tables

      it('"DELETE FROM room_songs" should not throw error', (finished) => {
        client.query('DELETE FROM room_songs', (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });

      it('"DELETE FROM rooms" should not throw error', (finished) => {
        client.query('DELETE FROM rooms', (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });

      it('"DELETE FROM songs" should not throw error', (finished) => {
        client.query('DELETE FROM songs', (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });
    });

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

    let roomId = null;
    describe('get roomid from room "steve"', () => {
      it('should return a roomId', (finished) => {
        client.query(getRoomIdFromRoomName(roomName), (error, result) => {
          expect(error).to.equal(null);
          expect(result.rowCount).to.equal(1);
          roomId = result.rows[0].id;
          finished();
        });
      });
    });

    describe('insert song into room_songs', () => {
      it('should not throw error', (finished) => {
        client.query(insertIntoRoomSongs(song.id, roomId, 0, 0), (error, result) => {
          expect(error).to.equal(null);
          finished();
        });
      });
    });

  });
});

