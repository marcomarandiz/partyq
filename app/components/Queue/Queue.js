import React from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist.js';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queue}>
          <QueueSonglist
            songs={this.props.queueSonglist}
            currentSong={this.props.currentSong}
            onUpvoteSong={this.props.onUpvoteSong}
            onPlaySong={() => this.props.onPlaySong()}
            onPauseSong={() => this.props.onPauseSong()}
            onNextSong={() => this.props.onNextSong()}
          />
        </div>
    );
  }
}
