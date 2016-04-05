/* eslint "no-unused-expressions": 0 */

import {expect } from 'chai';
import pg from 'pg';
import {
  getSidsFromRoomSongs,
  getSongBySid,
  getUpvotesFromRoomSongs,
  getSkipvotesFromRoomSongs,
  getNameFromRooms,
  insertNewRoom,
  insertIntoRoomSongs,
  insertSongIntoSongs,
  getRoomIdFromRoomName,
  updateUpvotesInRoomSongs,
  updateSkipvotesInRoomSongs,
  createRoomsTable,
  createSongsTable,
  createRoomSongsTable,
  runQuery
} from '../server/utils/sqllib';

const song = {
  sid: 123456789,
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
  describe('create tables if they dont exist', () => {
    it('create table rooms should not throw error', (finished) => {
      runQuery(createRoomsTable(), (error, result) => {
        expect(error).to.equal(null);
        finished();
      });
    });
    it('create table rooms should not throw error', (finished) => {
      runQuery(createSongsTable(), (error, result) => {
        expect(error).to.equal(null);
        finished();
      });
    });
    it('create table rooms should not throw error', (finished) => {
      runQuery(createRoomSongsTable(), (error, result) => {
        expect(error).to.equal(null);
        finished();
      });
    });
  });


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
      runQuery(getSongBySid(song.sid), (error, result) => {
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
      runQuery(insertIntoRoomSongs(song.sid, roomId, 0, 0), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });
  });

  describe('get sids from room_songs', () => {
    it('should return a row containing a sid', (finished) => {
      runQuery(getSidsFromRoomSongs(roomId), (error, result) => {
        expect(error).to.equal(null);
        expect(result.rowCount).to.equal(1);
        expect(result.rows[0].sid).to.equal(song.sid);
        finished();
      }, conString);
    });
  });

  describe('update upvotes for song in room_songs', () => {
    it('should not throw error', (finished) => {
      runQuery(updateUpvotesInRoomSongs(roomId, song.sid), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });
  });

  describe('update skipvotes for song in room_songs', () => {
    it('should not throw error', (finished) => {
      runQuery(updateSkipvotesInRoomSongs(roomId, song.sid), (error, result) => {
        expect(error).to.equal(null);
        finished();
      }, conString);
    });
  });

  describe('get upvotes for song in room_songs', () => {
    it('should return a row containing an upvote count', (finished) => {
      runQuery(getUpvotesFromRoomSongs(roomId, song.sid), (error, result) => {
        expect(error).to.equal(null);
        expect(result.rowCount).to.equal(1);
        expect(result.rows[0].upvotes).to.equal(1);
        finished();
      }, conString);
    });
  });

  describe('get skipvotes for song in room_songs', () => {
    it('should return a row containing an skipupvote count', (finished) => {
      runQuery(getSkipvotesFromRoomSongs(roomId, song.sid), (error, result) => {
        expect(error).to.equal(null);
        expect(result.rowCount).to.equal(1);
        expect(result.rows[0].skipvotes).to.equal(1);
        finished();
      }, conString);
    });
  });

  describe('get room_name by id from rooms', () => {
    it('should return a row containing a name', (finished) => {
      runQuery(getNameFromRooms(roomId), (error, result) => {
        expect(error).to.equal(null);
        expect(result.rowCount).to.equal(1);
        expect(result.rows[0].name).to.equal(roomName);
        finished();
      }, conString);
    });
  });

});

