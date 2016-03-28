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
        console.error('Error running query:', error);
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

