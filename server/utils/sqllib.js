import pg from 'pg';

const conString = process.env.PG_INFO;
// Sample constring
// pg://Alex@localhost/mydb

console.log(conString);

export function insertSongQuery(song) {
  return 'INSERT INTO songs (sid, source, title, artist, duration, upvotes, skipvotes) VALUES ('
      + song.id + ', \'' + song.src + '\', \'' + song.title + '\', \'' + song.artist + '\', '
      + song.duration + ', 0, 0);';
}

export function createQueryConfig(song) {
  const queryConfig = {
    text: 'INSERT INTO songs (sid, source, title, artist, duration, upvotes, skipvotes) VALUES ($1, $2, $3, $4, $5, 0, 0);',
    values: [
      song.id,
      song.src,
      song.title,
      song.artist,
      song.duration
    ]
  };
  console.log(queryConfig);
  return queryConfig;
}

pg.connect(conString, (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  const song = {
    id: 123456,
    src: 'youtube',
    title: 'Hello',
    artist: 'Adele',
    duration: 300
  };
  client.query(insertSongQuery(song), (error, result) => {
    console.log(result);
    console.log(error);
  });
  client.query(createQueryConfig(song), (error, result) => {
    console.log(result);
    console.log(error);
  });
});

