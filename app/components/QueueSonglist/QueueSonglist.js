import React from 'react';
import styles from './QueueSonglist.css';
import Song from '../Song/Song.js';

export default class QueueSonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpvote(index) {
    this.props.onUpvoteSong(index);
  }

  render() {
    const songList = this.props.songs.map((song, index) => <Song key={index} song={song} index={index} handleUpvote={() => this.handleUpvote(index)} />);
    return (
        <div className={styles.queueSonglist}>
          {songList}
        </div>
    );
  }
}
