import React, { PropTypes } from 'react';
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
        <div className={styles.queueSonglist + ' dimmable'}>
          {songList}
          <div className='ui dimmer'>
            <div className='content'>
              <div className='center'>
                <i className="huge white outline smile icon"></i>
                <h1>Song Added</h1>
              </div>
            </div>
          </div>
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
