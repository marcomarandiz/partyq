import pg from 'pg';

// Sample constring
// pg://Alex@localhost/mydb

export function runQuery(ourQuery, next, connectionString) {
  const conString = connectionString ? connectionString : process.env.PG_INFO;
  pg.connect(conString, (err, client, done) => {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(ourQuery, (error, result) => {
      if (error) {
        console.error('Error running query', ourQuery, error);
      }
      next(error, result);
      return;
    });
    done();
  });
}

export function getSidsFromRoomSongs(roomId) {
  return {
    text: 'SELECT sid FROM room_songs WHERE id = $1',
    values: [
      roomId
    ]
  };
}

export function getSongBySid(value) {
  return {
    text: 'SELECT * FROM songs WHERE sid = $1',
    values: [
      value
    ]
  };
}

export function getUpvotesFromRoomSongs(roomId, sid) {
  return {
    text: 'SELECT upvotes FROM room_songs WHERE id = $1 AND sid = $2',
    values: [
      roomId,
      sid
    ]
  };
}

export function getSkipvotesFromRoomSongs(roomId, sid) {
  return {
    text: 'SELECT skipvotes FROM room_songs WHERE id = $1 AND sid = $2',
    values: [
      roomId,
      sid
    ]
  };
}

export function getNameFromRooms(roomId) {
  return {
    text: 'SELECT name FROM rooms WHERE id = $1',
    values: [
      roomId
    ]
  };
}

export function getRoomIdFromRoomName(roomName) {
  return {
    text: 'SELECT id FROM rooms WHERE name = $1',
    values: [
      roomName
    ]
  };
}

export function insertNewRoom(creator, roomName) {
  return {
    text: 'INSERT INTO rooms VALUES (DEFAULT, $1, DEFAULT, $2, DEFAULT)',
    values: [
      creator,
      roomName
    ]
  };
}

export function insertIntoRoomSongs(sid, roomId, upvotes, skipvotes) {
  return {
    text: 'INSERT INTO room_songs VALUES ($1, $2, TRUE, TRUE, $3, $4, DEFAULT)',
    values: [
      sid,
      roomId,
      upvotes,
      skipvotes
    ]
  };
}

export function insertSongIntoSongs(song) {
  return {
    text: 'INSERT INTO songs (sid, source, title, artist, duration) VALUES ($1, $2, $3, $4, $5);',
    values: [
      song.id,
      song.src,
      song.title,
      song.artist,
      song.duration
    ]
  };
}

export function updateSkipvotesInRoomSongs(roomId, sid) {
  return {
    text: 'UPDATE room_songs SET skipvotes = skipvotes + 1 WHERE id = $1 AND sid = $2',
    values: [
      roomId,
      sid
    ]
  };
}

export function updateUpvotesInRoomSongs(roomId, sid) {
  return {
    text: 'UPDATE room_songs SET upvotes = upvotes + 1 WHERE id = $1 AND sid = $2',
    values: [
      roomId,
      sid
    ]
  };
}

// These functions are combinations of queries to do something
export function addSongToRoomSongs(sid, roomName) {
  // Get room id from roomName
  // TODO: Possibly handle song requests from history?
  runQuery(getRoomIdFromRoomName(roomName), (error, result) => {
    if (error) {
      console.err('Error getting room id from roomname.', error);
    } else if (result.rowCount !== 1) {
      console.err('Couldn\' find a room with name ' + roomName);
    } else {
      runQuery(insertIntoRoomSongs(sid, result.rows[0].id, 1, 0), (error2, res) => {
        if (error2) {
          console.err('Error adding song to room songs.', error2);
        }
      });
    }
  });
}


// Create tables if they don't already exist.
// These should not be getting used outside
// of tests or initial setup.

export function createRoomsTable() {
  return {
    text: 'CREATE TABLE IF NOT EXISTS rooms(id SERIAL PRIMARY KEY NOT NULL, creator VARCHAR(50) NOT NULL, creation_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(), name VARCHAR(20) UNIQUE NOT NULL, expired BOOLEAN DEFAULT FALSE)'
  };
}

export function createSongsTable() {
  return {
    text: 'CREATE TABLE IF NOT EXISTS songs(sid SERIAL PRIMARY KEY NOT NULL, source VARCHAR(200) NOT NULL, title VARCHAR(50) NOT NULL, artist VARCHAR(50) NOT NULL, duration int NOT NULL)'
  };
}

export function createRoomSongsTable() {
  return {
    text: 'CREATE TABLE IF NOT EXISTS room_songs(sid SERIAL REFERENCES songs (sid), id SERIAL REFERENCES rooms (id), current BOOLEAN DEFAULT FALSE, playing BOOLEAN DEFAULT FALSE, upvotes INT NOT NULL, skipvotes INT NOT NULL, date_added TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(), PRIMARY KEY (sid, id))'
  };
}
