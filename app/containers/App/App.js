import React, { PropTypes } from 'react';
import styles from './App.css';
import History from '../../components/History/History.js';
import Queue from '../../components/Queue/Queue.js';
import Header from '../../components/Header/Header.js';
import AddSong from '../../components/AddSong/AddSong.js';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { addSong } from '../../../common/actions/queue';
import { upvoteSong } from '../../../common/actions/song';
import nextSong from '../../../common/actions/nextSong';
import { playSong, pauseSong } from '../../../common/actions/currentSong';
import { reAddSong } from '../../../common/actions/history';
import { isLinkValid } from '../../../common/utils/functions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  pasteLink(event, dispatch) {
    const link = event.clipboardData.getData('Text').trim();
    if (isLinkValid(link)) {
      dispatch(addSong(link));
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
              onReAddSong={index => dispatch(reAddSong(index))} />
              <div className={classNames('pusher', styles.pusher)}>
                <div className={classNames('ui basic segment', styles.application)}>
                  <div className='ui grid'>
                  <div className='three wide column'>
                  </div>
                  <div className='seven wide column'>
                  <Queue
                      currentSong={this.props.queue.currentSong}
                      isPlaying={this.props.queue.isPlaying}
                      onNextSong={() => dispatch(nextSong())}
                      onPlaySong={() => dispatch(playSong())}
                      onPauseSong={()=> dispatch(pauseSong())}
                      songlist={this.props.queue.songlist}
                      queueSonglist={this.props.queue.songlist}
                      onUpvoteSong={index => dispatch(upvoteSong(index))}
                       />
                  <AddSong onAddSong={songName =>dispatch(addSong(songName))}/>
                  </div>
                  <div className='three wide column'>
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
