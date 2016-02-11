import React from 'react';
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer.js';
import SoundcloudPlayer from '../SoundcloudPlayer/SoundcloudPlayer.js';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  pause() {
    switch (this.props.currentSong.src) {
    case 'youtube':
      this.refs.YoutubePlayer.pause();
      break;
    case 'soundcloud':
      this.refs.SoundcloudPlayer.pause();
      break;
    default:
      console.log('Pause button pressed with no song in queue or invalid src in Currentsong');
    }
  }

  play() {
    switch (this.props.currentSong.src) {
    case 'youtube':
      this.refs.YoutubePlayer.play();
      break;
    case 'soundcloud':
      this.refs.SoundcloudPlayer.play();
      break;
    default:
      console.log('Play button pressed with no song in queue or invalid src in Currentsong');
    }
  }

  render() {
    if (this.props.currentSong.src) {
      switch (this.props.currentSong.src) {
      case 'youtube':
        return (
          <YoutubePlayer
            currentSong={this.props.currentSong}
            onNextSong={() => this.props.onNextSong()}
            onNextReady={() => this.props.onNextReady()}
            isPlaying={this.props.isPlaying}
            ref='YoutubePlayer'
          />
        );
      case 'soundcloud':
        return (
          <SoundcloudPlayer
            currentSong={this.props.currentSong}
            onNextSong={() => this.props.onNextSong()}
            onNextReady={() => this.props.onNextReady()}
            isPlaying={this.props.isPlaying}
            ref='SoundcloudPlayer'
          />
        );
      default:
        return (
          <div>
            Something weird happened. We have a song but the src isnt supported.
          </div>
        );
      }
    } else {
      return (
        <div>
          Add a song to queue!
        </div>
      );
    }

  }
}
