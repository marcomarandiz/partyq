import Server from 'socket.io';
import { youtubeAPI, soundcloudAPI } from './utils/APIcalls';
import { ADD_SONG_REQUEST } from '../common/constants/ActionTypes';
import { YouTube, SoundCloud } from '../common/constants/SourceTypes';
import { createRoom } from '../common/actions/roomActions';
import { getVidFromUrl } from '../common/utils/functions';
import { callbackApiSuccess,
         callbackApiError,
         dispatchUpvoteIfSongInQueue,
         pathToRoomName,
         cleanupSong } from './utils/lib';
import { runQuery,
         insertNewRoom,
         addSongToRoomSongs,
         getSidsFromRoomSongs,
         insertSongIntoSongs,
         getSongBySid,
         getRoomIdFromRoomName } from './utils/sqllib';

const development = process.env.NODE_ENV !== 'production';

export default function startServer(store) {
  const io = new Server().attach(8090);

  const partyq = io.of('/partyq');

  // Emit 'state' to socket.io when Store changes
  store.subscribe(
    () => {
      const lastroom = store.getState().lastroom;
      partyq.to(lastroom).emit('state', store.getState()[lastroom]);
    }
  );

  partyq.on('connection', (socket) => {
    const pathname = socket.handshake.query.path;
    const roomname = pathToRoomName(pathname);
    // Get the path from the socket's window.location.pathname

    if (!(roomname in store.getState())) {
      socket.emit('owner', roomname);
      // TODO: Use different id for production
      runQuery(getRoomIdFromRoomName(roomname), (error, result) => {
        if (result.rowCount === 0) {
          runQuery(insertNewRoom(socket.id, roomname), (err, res) => {
            console.log(result);
          });
        } else {
          console.log(result);
          console.log('Room', roomname, 'already exists');
          // TODO: Logic to restore room from db here
          runQuery(getSidsFromRoomSongs(result.rows[0].id), (err, res) => {
            console.log(res);
          });
        }
      });
      store.dispatch(createRoom(roomname));
    }
    socket.join(roomname);
    partyq.to(roomname).emit('state', store.getState()[roomname]);

    // Feed action event from clients directly into store
    // Should probably put authentication here
    socket.on('action', (action) => {

      // Attach the remote address as id so we know who performed the actions
      // If we are in production, use the ip address
      // If we are developing, use the socket id
      action.id = development ? socket.id :
        socket.request.connection.remoteAddress;

      // TODO: update to actual room name
      action.roomname = roomname;

      // Checks if action is 'ADD_SONG_REQUEST' and if it is
      // it calls the youtubeAPI and if it is and makes
      // a callback to handle errors or dispatch the song.
      // If action is not ADD_SONG_REQUEST it just
      // dispatches the action.
      if (action.type === ADD_SONG_REQUEST) {
        switch (action.src) {
        case YouTube:
          const youtubeVid = getVidFromUrl(action.url);
          if (!dispatchUpvoteIfSongInQueue(action, youtubeVid, socket, store)) {
            runQuery(getSongBySid(youtubeVid), (error, result) => {
              if (error) {
                console.err('Error getting song by sid', error);
              } else if (result.rowCount === 0) {
                youtubeAPI(action.url, (error2, song) => {
                  if (error) {
                    callbackApiError(error, socket, store);
                  } else if (song) {
                    const cleanSong = cleanupSong(song);
                    callbackApiSuccess(cleanSong, action, socket, store);
                    runQuery(insertSongIntoSongs(cleanSong), (error3, result2) => {
                      if (error2) {
                        console.err('Error inserting song into songs.', error3);
                      } else {
                        addSongToRoomSongs(youtubeVid, roomname);
                      }
                    });
                  }
                });
              } else {
                addSongToRoomSongs(youtubeVid, roomname);
              }
            });
          }
          break;
        case SoundCloud:
          soundcloudAPI(action.url, (error, song) => {
            if (error) {
              callbackApiError(error, socket, store);
            } else if (song) {
              if (!dispatchUpvoteIfSongInQueue(action, song.vid, socket, store)) {
                callbackApiSuccess(song, action, socket, store);
              }
            }
          });
          break;
        default:
          console.log('How did you get this source?' + action.src);
        }
      } else {
        console.log(action);
        store.dispatch.bind(store)(action);
      }
    });
  });
}
