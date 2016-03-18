import pg from 'pg';

const conString = process.env.PG_INFO;
// Sample constring
// pg://Alex@localhost/mydb

console.log(conString);

export function getSidsFromRoomSongs(roomId) {
  return {
    text: 'SELECT sid FROM room_songs WHERE id = $1',
    values: roomId
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
    text: 'INSERT INTO room_songs VALUES ($1, $2, TRUE, TRUE, upvotes, skipvotes, DEFAULT)',
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

/*
pg.connect(conString, (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  const song = {
    id: 123456789,
    src: 'youtube',
    title: 'Hello',
    artist: 'Adele',
    duration: 300
  };
  client.query(insertSongIntoSongs(song), (error, result) => {
    // console.log(result);
    console.log(error);
  });
  const queryConfig = getSongBySid(song.id);
  console.log(queryConfig);
  client.query('SELECT * FROM songs WHERE sid = 123456789;', (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result.rowCount);
  });
  client.query(queryConfig, (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result.rowCount);
  });
});
*/
