import React, { PropTypes } from 'react';
import styles from './CurrentSong.css';
import classNames from 'classnames';
import SoundCloudAudio from 'soundcloud-audio';
import Player from '../Player/Player.js';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlay() {
    this.props.onPlaySong();
    this.refs.Player.play();
  }

  handlePause() {
    this.props.onPauseSong();
    this.refs.Player.pause();
  }

  handleNextSong() {
    this.props.onNextSong();
  }

  scOnReady(event, context) {
    console.log(event);
  }

  render() {
    console.log('currentSong render');

    if (this.props.currentSong.src === 'soundcloud') {
      const scPlayer = new SoundCloudAudio('cbdd7f755416f67e838e272848d988d1');
      scPlayer.audio.autoplay = true;
      scPlayer.play({streamUrl: this.props.currentSong.url});
      console.log(scPlayer);
    }

    return (
    <div>
      {this.props.currentSong ?
      <Player
        currentSong={this.props.currentSong}
        onNextSong={() => this.props.onNextSong()}
        onNextReady={() => this.props.onNextReady()}
        isPlaying={this.props.isPlaying}
        ref='Player'
      /> : ''}
      <div className={classNames('ui', 'grid', 'red', 'segment', styles.youtubeVideo)}>
        <div className={classNames('four', 'wide', 'column', 'center', 'aligned', styles.currentSong)}>
          <div>
            <i className={classNames('big', 'white', 'double', 'angle', 'up', 'link', 'icon', styles.upvoteButton)}
            onClick={() => this.props.handleUpvote(this.props.index)}></i>
          </div>
          <div>
            {this.props.currentSong.upvotes}
          </div>
        </div>
        <div className={classNames('twelve', 'wide', 'column', styles.currentSong)}>
          {this.props.currentSong.title}
          {this.props.isPlaying ?
          <ui onClick={() => this.handlePause()}>
          <i className={classNames('huge', 'pause', 'link', 'icon', styles.buttonAccents)}></i>
          </ui> :
          <ui onClick={() => this.handlePlay()}>
          <i className={classNames('huge', 'play', 'link', 'icon', styles.buttonAccents)}></i></ui>}
          <ui onClick={() => this.handleNextSong()}>
          <i className={classNames('huge', 'step', 'forward', 'link', 'icon', styles.buttonAccents)}></i></ui>
        </div>
      </div>
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
