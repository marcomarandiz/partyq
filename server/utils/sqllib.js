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

export function getSidBySource(url) {
  return {
    text: 'SELECT sid FROM songs WHERE source = $1',
    values: [
      url
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
    text: 'INSERT INTO songs (source, title, artist, duration, thumbnail) VALUES ($1, $2, $3, $4, $5);',
    values: [
      song.url,
      song.title,
      song.artist,
      song.duration,
      song.thumbnail
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
export function addSongToDatabase(song, roomName) {
  runQuery(insertSongIntoSongs(song), (insertSongError, insertSongResult) => {
    if (insertSongError) {
      console.log('Insert song into songs error');
      console.log(insertSongError);
    }

    const sidPromise = new Promise((resolve, reject) => {
      runQuery(getSidBySource(song.url), (error, result) => {
        if (error) {
          reject('Get song by source error', error);
        } else {
          resolve(result.rows[0].sid);
        }
      });
    });

    const ridPromise = new Promise((resolve, reject) => {
      runQuery(getRoomIdFromRoomName(roomName), (error, result) => {
        if (error) {
          reject('Get roomId by roomname error', error);
        } else {
          resolve(result.rows[0].id);
        }
      });
    });

    Promise.all([sidPromise, ridPromise]).then((results) => {
      runQuery(insertIntoRoomSongs(results[0], results[1], 1, 0), (error, result) => {
        if (error) {
          console.log('Error in insertIntoRoomSongs');
          console.log(error);
        }
      });
    });

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
