import pg from 'pg';

const conString = process.env.PG_INFO;

pg.connect(conString, (err, client, done) => {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  return console.log('no error');
});
