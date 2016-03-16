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

pg.connect(conString, (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  const query = insertSongQuery({
    id: 123456,
    src: 'youtube',
    title: 'Hello',
    artist: 'Adele',
    duration: 300
  });
  console.log(query);
  client.query(query, (error, result) => {
    console.log(result);
    console.log(error);
  });
});

