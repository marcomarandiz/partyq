import React from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist.js';
import CurrentSong from '../CurrentSong/CurrentSong.js';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queue}>
        // Only show current song if there is one
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
