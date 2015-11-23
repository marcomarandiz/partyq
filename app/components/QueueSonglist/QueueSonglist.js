import React, { PropTypes } from 'react';
import styles from './QueueSonglist.css';
import Song from '../Song/Song.js';
import classNames from 'classnames';

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
        <div className={classNames(styles.queueSonglist, 'dimmable')}>
          {songList}
          <div className={classNames('ui', 'dimmer')}>
            <div className={classNames('content')}>
              <div className={classNames('center')}>
                <i id='dimmerIcon'
                   className={classNames('huge', 'white', 'outline', 'checkmark', 'icon')}></i>
                <h1 id='dimmerTextMain'></h1>
                <h2 id='dimmerTextSecondary'></h2>
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
