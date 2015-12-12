import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';
import styles from './CurrentSong.css';
import classNames from 'classnames';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton } from 'react-soundplayer/components';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlay() {
    this.props.onPlaySong();
    this.youtube.playVideo();
  }

  handlePause() {
    this.props.onPauseSong();
    this.youtube.pauseVideo();
  }

  handleNextSong() {
    this.props.onNextSong();
  }

  _onReady(event, context) {
    // Autoplay if isPlaying = true
    if (context.props.isPlaying) {
      context.props.onPlaySong();
    }

    // Max the volume out
    event.target.setVolume(100);

    // context = this from react
    // this = this for this function to Youtube API
    context.youtube = event.target;
    context.props.onNextReady();
    console.log(context);
  }

  _onEnd(event, context) {
    // Handles events at the end of a song
    // context.youtube = event.target;
    context.handleNextSong();
  }

  render() {
    const opts = {
      height: '300',
      width: '100%',
      playerVars: {
        autoplay: 0, // enables autoplay
        disablekb: 0 // disables keyboard controls
      }
    };

    // Make sure that play/pause stays up to date between clients
    if (this.youtube && this.props.isPlaying) {
      this.youtube.playVideo();
    } else if (this.youtube && ! this.props.isPlaying) {
      this.youtube.pauseVideo();
    }
    return (
    <div>
      <div className={classNames()}>
        {(this.props.currentSong.url && this.props.currentSong.src === 'youtube') ?
          <YouTube
          url={this.props.currentSong.url}
          opts={opts}
          onReady={(event) => this._onReady(event, this)}
          onEnd={(event) => this._onEnd(event, this)}/> : ''}
      </div>
      <div className={classNames()}>
        {(this.props.currentSong.url && this.props.currentSong.src === 'soundcloud') ?
          <SoundPlayerContainer
            clientId='cbdd7f755416f67e838e272848d988d1'
            streamUrl={this.props.currentSong.url}
          >
          <PlayButton />
          </SoundPlayerContainer> : ''}
      </div>

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
