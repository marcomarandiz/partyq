import React, { PropTypes } from 'react';
import styles from './App.css';
import History from '../../components/History/History.js';
import Queue from '../../components/Queue/Queue.js';
import Header from '../../components/Header/Header.js';
import AddSong from '../../components/AddSong/AddSong.js';
import { connect } from 'react-redux';
import classNames from 'classnames';
import io from 'socket.io-client';
import notie from 'notie';

import { addSong, addSongRequest, nextReady, playSong, pauseSong } from '../../../common/actions/queueActions';
import { nextSong, upvoteSong } from '../../../common/actions/mainActions';
import { isLinkValid } from '../../../common/utils/functions';

const socket = io(`${location.protocol}//${location.hostname}:8090/partyq`);

class App extends React.Component {
  constructor(props) {
    super(props);

    // Called when youtube api fails to get video
    socket.on('add_song_error', (error) => {
      console.error(error);
      notie.alert(3, 'Invalid URL: song not added', 2.5);
    });

    // Called when youtube api succeeds
    socket.on('add_song_success', (song) => {
      console.log(song);
      notie.alert(1, song.title + ' added!');
    });
  }

  pasteLink(event, dispatch) {
    const link = event.clipboardData.getData('Text').trim();
    if (isLinkValid(link)) {
      dispatch(addSongRequest(link));
    } else {
      console.log('Invalid link: ', link);
    }
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div
        className={classNames(styles.app)}
        onPaste={(event) => this.pasteLink(event, dispatch)}>
        <Header />
          <div className={classNames('ui', 'attached', 'segment', 'pushable', styles.app)}>
            <History
              historySonglist={this.props.history.songlist}
              onReAddSong={song => dispatch(addSong(song))} />
              <div className={classNames('pusher', styles.pusher)}>
                <div className={classNames('ui', 'basic', 'segment', styles.application)}>
                  <div className={classNames('ui', 'grid')}>
                  <div className={classNames('three', 'wide', 'column')}>
                  </div>
                  <div className={classNames('seven', 'wide', 'column')}>
                  <Queue
                      // I think we need to check if this is
                      // development or production. Not sure
                      // how to do this here.
                      id={socket.id}

                      currentSong={this.props.queue.currentSong}
                      songlist={this.props.queue.songlist}
                      isPlaying={this.props.queue.isPlaying}
                      owner={this.props.owner}
                      onNextSong={() => dispatch(nextSong())}
                      onPlaySong={() => dispatch(playSong())}
                      onPauseSong={()=> dispatch(pauseSong())}
                      onUpvoteSong={index => dispatch(upvoteSong(index))}
                      onNextSong={() => dispatch(nextSong())}
                      onNextReady={() => dispatch(nextReady())} />
                  <div className={
                      classNames('ui', 'basic', 'attached', 'segment', styles.app)}>
                    <AddSong onAddSong={songName => dispatch(addSongRequest(songName))}/>
                  </div>
                </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    songlist: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
  }).isRequired,
  queue: PropTypes.shape({
    currentSong: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    songlist: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired
  }).isRequired
};

// Get the items from state
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
