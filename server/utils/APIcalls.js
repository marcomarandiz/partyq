import https from 'https';
import moment from 'moment';

export function youtubeAPI(url, vid) {
  const song = {};
  song.url = url;
  song.vid = vid;
  song.artist = null;
  song.duration = null;
  song.src = null;
  song.title = null;
  song.uploadDate = null;
  song.upvotes = 0;
  song.userUpvotes = [];
  song.thumbnail = null;
  song.endedAt = null;

  // key has to be passed in as an environment varibale
  // Example: YOUTUBE_API=aksdfjalksdfjalskdfjlk npm start
  if (!process.env.YOUTUBE_API) {
    console.log('You didnt put in an API key correctly so partyq will not pull song information from the YouTube API.');
    console.log('To run with API key do $YOUTUBE_API={API_KEY_HERE} npm start');
    return song;
  }

  const callAPIURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='
           + song.vid + '&key=' + process.env.YOUTUBE_API;

  https.get(callAPIURL, function(res) {
    let data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      const youTubeSongData = JSON.parse(data);
      if (youTubeSongData.error) {
        console.log('API error');
        console.log('Reason: ' + youTubeSongData.error.errors[0].reason);
        console.log('Message: ' + youTubeSongData.error.errors[0].message);
      } else if (!youTubeSongData.items[0]) {
        console.log('Invalid VID: ' + song.vid);
      } else {
        song.duration = moment.duration(youTubeSongData.items[0].contentDetails.duration).asMilliseconds();
        song.artist = youTubeSongData.items[0].snippet.channelTitle;
        song.duration = moment.utc(song.duration).format('mm:ss');
        song.title = youTubeSongData.items[0].snippet.title;
        song.uploadDate = youTubeSongData.items[0].snippet.publishedAt;
        song.thumbnail = youTubeSongData.items[0].snippet.thumbnails.default.url;
        song.src = 'youtube';
        console.log(song);
      }
      return song;
    });
  });
  return song;
}
