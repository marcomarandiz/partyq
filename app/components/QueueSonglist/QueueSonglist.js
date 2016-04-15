import React, { PropTypes } from 'react';
import Song from '../Song/Song.js';
import classNames from 'classnames';
import styles from './QueueSonglist.css';

export default class QueueSonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpvote(index) {
    this.props.onUpvoteSong(index);
  }

  render() {
    const songList = this.props.songs.map((song, index) =>
      <Song key={index} song={song} index={index} handleUpvote={() => this.handleUpvote(index)} />
    );
    return (
      <div className={classNames('col-md-3', 'playlist', styles.list, styles.playlist)}>
        <h3>Playlist</h3>
        <ul id='videolist' className={classNames(styles.videolist)}>
          {songList}
        </ul>
      </div>
    );
  }
}

QueueSonglist.propTypes = {
  onUpvoteSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
