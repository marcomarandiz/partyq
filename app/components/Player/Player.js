import React from 'react';
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer.js';
import SoundcloudPlayer from '../SoundcloudPlayer/SoundcloudPlayer.js';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  pause() {
    console.log('Player pause');
    switch (this.props.currentSong.src) {
    case 'youtube':
      this.refs.YoutubePlayer.pause();
      break;
    default:
      console.log('Pause button pressed with no song in queue or invalid src in Currentsong');
    }
  }

  play() {
    console.log('Player play');
    switch (this.props.currentSong.src) {
    case 'youtube':
      this.refs.YoutubePlayer.play();
      break;
    default:
      console.log('Play button pressed with no song in queue or invalid src in Currentsong');
    }
  }

  render() {
    console.log('Player render');
    console.log(this.props);
    // Make sure that play/pause stays up to date between clients

    if (this.props.currentSong.src) {
      console.log('switch is valid');
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
            ref='SouncloudPlayer'
          />
        );
      default:
        return (
          <div>
            Something weird happened. We have a song but the src isn't supported.
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
