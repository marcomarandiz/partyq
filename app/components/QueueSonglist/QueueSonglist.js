import React, { PropTypes } from 'react';
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
    const songList = this.props.songs.map((song, index) =>
      <Song key={index} song={song} index={index} handleUpvote={() => this.handleUpvote(index)} />
    );
    return (
        <div className={classNames('dimmable')}>
          {songList}
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
