import React, { PropTypes } from 'react';
import styles from './CurrentSong.css';
import classNames from 'classnames';
import Player from '../Player/Player.js';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className={classNames(styles.title)}>{this.props.currentSong.title}</h2>
        {this.props.currentSong ?
          <Player
            currentSong={this.props.currentSong}
            onNextSong={() => this.props.onNextSong()}
            onNextReady={() => this.props.onNextReady()}
            isPlaying={this.props.isPlaying}
            ref='Player'
          /> : ''}
      </div>
    );
  }
}

// Ensure that props are passed down properly
CurrentSong.propTypes = {
  currentSong: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    artist: PropTypes.string,
    src: PropTypes.string,
    uploadDate: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  onPlaySong: PropTypes.func.isRequired,
  onPauseSong: PropTypes.func.isRequired,
  onNextSong: PropTypes.func.isRequired
};
