import React, { PropTypes } from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist.js';
import CurrentSong from '../CurrentSong/CurrentSong.js';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // Only show current song if there is one
        <div className={styles.queue}>
        {this.props.currentSong !== null ?
          <CurrentSong
            currentSong={this.props.currentSong}
            onPlaySong={() => this.props.onPlaySong()}
            onPauseSong={() => this.props.onPauseSong()}
            onNextSong={() => this.props.onNextSong()}
            isPlaying={this.props.isPlaying}
           /> : ''}
          <QueueSonglist
            songs={this.props.songlist}
            onUpvoteSong={this.props.onUpvoteSong}
          />
        </div>
    );
  }
}

Queue.propTypes = {
  // This should be required, but we are passing it in as null...
  currentSong: PropTypes.object,
  onPlaySong: PropTypes.func.isRequired,
  onPauseSong: PropTypes.func.isRequired,
  onNextSong: PropTypes.func.isRequired,
  onUpvoteSong: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  songlist: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
