import React from 'react';
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer.js';
import SoundcloudPlayer from '../SoundcloudPlayer/SoundcloudPlayer.js';
import VolumeSlider from '../Volume/VolumeSlider';

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

  changeVolume(newVolume) {
    console.log('New volume: ' + newVolume);
    switch (this.props.currentSong.src) {
    case 'youtube':
      this.refs.YoutubePlayer.setVolume(newVolume);
      break;
    case 'soundcloud':
      this.refs.SoundcloudPlayer.setVolume(newVolume);
      break;
    default:
      console.log('Changing Volume');
    }
  }

  render() {
    if (this.props.currentSong.src) {
      switch (this.props.currentSong.src) {
      case 'youtube':
        return (
          <div>
            <YoutubePlayer
              currentSong={this.props.currentSong}
              onNextSong={() => this.props.onNextSong()}
              onNextReady={() => this.props.onNextReady()}
              isPlaying={this.props.isPlaying}
              ref='YoutubePlayer'
            />
            <VolumeSlider
              changeVolume={(newVolume) => this.changeVolume(newVolume)}
            />
          </div>
        );
      case 'soundcloud':
        return (
          <div>
            <SoundcloudPlayer
              currentSong={this.props.currentSong}
              onNextSong={() => this.props.onNextSong()}
              onNextReady={() => this.props.onNextReady()}
              isPlaying={this.props.isPlaying}
              ref='SoundcloudPlayer'
            />
            <VolumeSlider
              changeVolume={(newVolume) => this.changeVolume(newVolume)}
            />
          </div>
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
          <VolumeSlider
            changeVolume={(newVolume) => this.changeVolume(newVolume)}
          />
        </div>
      );
    }

  }
}
