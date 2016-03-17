import pg from 'pg';

const conString = process.env.PG_INFO;
// Sample constring
// pg://Alex@localhost/mydb

console.log(conString);

export function createInsertSongQuery(song) {
  return {
    text: 'INSERT INTO songs (sid, source, title, artist, duration, upvotes, skipvotes) VALUES ($1, $2, $3, $4, $5, 0, 0);',
    values: [
      song.id,
      song.src,
      song.title,
      song.artist,
      song.duration
    ]
  };
}

export function createSelectSongByParam(param, value) {
  return {
    text: 'SELECT * FROM songs WHERE $1 = $2;',
    values: [
      param,
      value
    ]
  };
}

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
  client.query(createInsertSongQuery(song), (error, result) => {
    console.log(result);
    console.log(error);
  });
  const queryConfig = createSelectSongByParam('sid', song.id);
  console.log(queryConfig);
  client.query('SELECT * FROM songs WHERE sid = 123456789;', (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result);
  });
  client.query(queryConfig, (error, result) => {
    if (error) {
      console.error(error);
    }
    console.log(result);
  });
});

