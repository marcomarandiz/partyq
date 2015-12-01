import React, { PropTypes } from 'react';
import styles from './App.css';
import History from '../../components/History/History.js';
import Queue from '../../components/Queue/Queue.js';
import Header from '../../components/Header/Header.js';
import { connect } from 'react-redux';
import classNames from 'classnames';
import io from 'socket.io-client';
import notie from 'notie';
import { addSong, addSongRequest, nextReady, playSong, pauseSong } from '../../../common/actions/queueActions';
import { nextSong, upvoteSong } from '../../../common/actions/mainActions';
import { isLinkValid, getVidFromUrl, songInQueue } from '../../../common/utils/functions';

const socket = io(`${location.protocol}//${location.hostname}:8090/partyq`);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.ga.initialize('UA-70628505-1');

    // Called when youtube api fails to get video
    socket.on('add_song_error', (error) => {
      console.error(error);
      notie.alert(3, 'Invalid video id: song not added', 2.5);
    });

    // Called when youtube api succeeds
    socket.on('add_song_success', (song) => {
      console.log(song);
      notie.alert(1, song.title + ' added!');
    });
  }

  componentDidMount() {
    this.props.ga.pageview('/');
  }

  songIsOkay(url) {
    if (isLinkValid(url)) {
      if (!songInQueue(this.props.queue, getVidFromUrl(url))) {
        return true;
      }
      notie.alert(3, 'Song already in queue, not added', 2.5);
    } else {
      notie.alert(3, 'Invalid link: ' + url, 2.5);
    }
    return false;
  }

  pasteLink(event, dispatch) {
    const link = event.clipboardData.getData('Text').trim();
    if (this.songIsOkay(link)) {
      dispatch(addSongRequest(link));
    }
  }

  addSongRequest(url, dispatch) {
    if (this.songIsOkay(url)) {
      dispatch(addSongRequest(url));
    }
  }

  reAddSongRequest(song, dispatch) {
    if (!songInQueue(this.props.queue, song.vid)) {
      dispatch(addSong(song));
      notie.alert(1, song.title + ' added!');
    } else {
      notie.alert(3, 'Song already in queue, not added', 2.5);
    }
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className={classNames(styles.app)} onPaste={(event) => this.pasteLink(event, dispatch)}>
        <Header onAddSong={link => this.addSongRequest(link, dispatch)}/>
        <div className={classNames('ui', 'attached', 'segment', 'pushable', styles.app)}>
          <History historySonglist={this.props.history.songlist} onReAddSong={song => this.reAddSongRequest(song, dispatch)}/>
          <div className={classNames('pusher', styles.pusher)}>
            <div className={classNames('ui', 'basic', 'segment', styles.application)}>
              <div className={classNames('ui', 'grid')}>
                <div className={classNames('three', 'wide', 'column')}></div>
                <div className={classNames('seven', 'wide', 'column')}>
                  <Queue

                    id={socket.id}

                    currentSong={this.props.queue.currentSong}
                    isPlaying={this.props.queue.isPlaying}
                    onNextSong={() => dispatch(nextSong())}
                    onPlaySong={() => dispatch(playSong())}
                    onPauseSong={()=> dispatch(pauseSong())}
                    songlist={this.props.queue.songlist}
                    owner={this.props.owner}
                    queueSonglist={this.props.queue.songlist}
                    onUpvoteSong={index => dispatch(upvoteSong(index))}
                    onNextSong={() => dispatch(nextSong())}
                    onNextReady={() => dispatch(nextReady())} />
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
  }).isRequired,
  ga: PropTypes.object.isRequired
};

// Get the items from state
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
