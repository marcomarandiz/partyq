import https from 'https';
import moment from 'moment';
import { getVidFromUrl } from '../../common/utils/functions.js';

// next is a callback
export function youtubeAPI(url, next) {
  const song = {};
  const error = {};
  song.url = url;
  song.id = getVidFromUrl(url);

  // key has to be passed in as an environment varibale
  // Example: YOUTUBE_API=aksdfjalksdfjalskdfjlk npm start
  if (!process.env.YOUTUBE_API) {
    error.error = 'You didnt put in an API key correctly so partyq will not pull song information from the YouTube API.'
                  + '\nTo run with API key do $YOUTUBE_API={API_KEY_HERE} npm start';
    return next(error);
  }

  const callAPIURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='
           + song.id + '&key=' + process.env.YOUTUBE_API;

  https.get(callAPIURL, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const youTubeSongData = JSON.parse(data);
      if (youTubeSongData.error) {
        error.error = 'API error';
        error.reason = youTubeSongData.error.errors[0].reason;
        error.message = youTubeSongData.error.errors[0].message;
        return next(error);
      }
      if (!youTubeSongData.items[0]) {
        error.error = 'Invalid VID: ' + song.id;
        return next(error);
      }
      song.duration = moment.duration(youTubeSongData.items[0].contentDetails.duration).asMilliseconds();
      song.artist = youTubeSongData.items[0].snippet.channelTitle;
      song.duration = moment.utc(song.duration).format('mm:ss');
      song.title = youTubeSongData.items[0].snippet.title;
      song.uploadDate = youTubeSongData.items[0].snippet.publishedAt;
      song.thumbnail = youTubeSongData.items[0].snippet.thumbnails.default.url;
      song.src = 'youtube';
      next(null, song);
    });
  });
}

// Start of API call
export function soundcloudAPI(url, next) {
  const song = {};
  const error = {};

  if (!process.env.SOUNDCLOUD_CLIENT_ID) {
    error.error = 'Need a soundcloud_client_id to handle soundcloud links.' +
      '\nTo run with client_id do $SOUNDCLOUD_CLIENT_ID={KEY_HERE} npm start';
    return next(error);
  }

  const resolveURL = 'https://api.soundcloud.com/resolve?url='
                    + url + '&client_id=' + process.env.SOUNDCLOUD_CLIENT_ID;

  // Resolve URL
  // Soundcloud API has a neat thing called resolve
  // We just pass it the url the user gives us and it
  // gives us a new url that's the exact API call we
  // need to get song information.
  https.get(resolveURL, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      // make API call for information on JSON.parse(data).location;
      // Need to make errorcheck to make sure the resolve API worked
      const resolveInfo = JSON.parse(data);
      if (resolveInfo.errors) {
        error.error = 'Resolve API error.';
        error.message = resolveInfo.errors[0].error_message;
        next(error);
      } else {
        https.get(resolveInfo.location, (res2) => {
          let data2 = '';
          res2.on('data', (chunk) => {
            data2 += chunk;
          });
          res2.on('end', () => {
            const songInfo = JSON.parse(data2);
            song.thumbnail = songInfo.artwork_url;
            song.artist = songInfo.user.username;
            song.duration = moment.duration(songInfo.duration);
            song.title = songInfo.title;
            song.url = songInfo.stream_url;   // might want to use 'uri' field instead
            song.src = 'soundcloud';          // this should be set elsewhere
            song.uploadDate = songInfo.created_at;
            song.id = songInfo.id;
            next(null, song);
          });
        });
      }
    });
  });
}
