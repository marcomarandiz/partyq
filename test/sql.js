/* eslint "no-unused-expressions": 0 */

import {expect } from 'chai';
import pg from 'pg';
import {
  // getSidsFromRoomSongs,
  getSongBySid,
  // getUpvotesFromRoomSongs,
  // getSkipVotesFromRoomSongs,
  // getNameFromRooms,
  insertNewRoom,
  insertIntoRoomSongs,
  insertSongIntoSongs,
  getRoomIdFromRoomName,
  runQuery
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

describe('postgres tests', () => {
  it('connected to partyqtest database', () => {
    pg.connect(conString, (err, client, done) => {
      expect(err).to.equal(null);
      done();
    });
  });

  // TODO: Make sure correct tables exist

  // Empties Tables
  describe('clear tables', () => {

    // room_songs has to be deleted first
    // Otherwise you can't delete the other tables

    it('"DELETE FROM room_songs" should not throw error', (finished) => {
      runQuery('DELETE FROM room_songs', (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });

    it('"DELETE FROM rooms" should not throw error', (finished) => {
      runQuery('DELETE FROM rooms', (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });

    it('"DELETE FROM songs" should not throw error', (finished) => {
      runQuery('DELETE FROM songs', (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });
  });

  describe('insert song', () => {
    it('should not throw error', (finished) => {
      runQuery(insertSongIntoSongs(song), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });

    it('should return a song', (finished) => {
      runQuery(getSongBySid(song.id), (error, result) => {
        expect(result.rows).to.deep.equal([{
          sid: 123456789,
          source: 'youtube',
          title: 'Hello',
          artist: 'Adele',
          duration: 300
        }]);
        finished();
      }, conString);
    });
  });

  describe('insert room', () => {
    it('should not throw error', (finished) => {
      runQuery(insertNewRoom(creator, roomName), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });

    it('should return a row', (finished) => {
      runQuery('SELECT * FROM rooms', (error, result) => {
        expect(result.rowCount).to.equal(1);
        expect(result.rows[0].creator).to.equal('steve');
        expect(result.rows[0].name).to.equal('jd2211');
        finished();
      }, conString);
    });
  });

  let roomId = null;
  describe('get roomid from room "steve"', () => {
    it('should return a roomId', (finished) => {
      runQuery(getRoomIdFromRoomName(roomName), (error, result) => {
        expect(error).to.equal(null);
        expect(result.rowCount).to.equal(1);
        roomId = result.rows[0].id;
        finished();
      }, conString);
    });
  });

  describe('insert song into room_songs', () => {
    it('should not throw error', (finished) => {
      runQuery(insertIntoRoomSongs(song.id, roomId, 0, 0), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });
  });
});

