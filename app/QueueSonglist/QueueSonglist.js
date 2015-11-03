import React from 'react';
import styles from './QueueSonglist.css';
import Song from '../Song/Song.js';

export default class QueueSonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const songList = this.props.songs.map(song => <Song song={song} />);
    return (
        <div className={styles.queueSonglist}>
        {songList}
        </div>
    );
  }
}
