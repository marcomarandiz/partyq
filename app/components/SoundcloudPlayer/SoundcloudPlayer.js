import React from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';

export default class SoundcloudPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // For autoplay functionality
    if (this.props.isPlaying) {
      this.play();
    }
    // Show in console SoundPlayerContainer object
    console.log(this.refs.SoundPlayerContainer);

    // Handles next song when a song ends
    this.refs.SoundPlayerContainer.soundCloudAudio.on('ended', () => this.props.onNextSong());
  }

  componentWillUnmount() {
    // For next functionality
    if (this.props.isPlaying) {
      this.pause();
    }
  }

  setVolume(newVolume) {
    this.refs.SoundPlayerContainer.soundCloudAudio.audio.volume = newVolume / 100;
  }

  pause() {
    this.refs.SoundPlayerContainer.soundCloudAudio.pause();
  }

  play() {
    this.refs.SoundPlayerContainer.soundCloudAudio.play();
  }

  render() {
    // Note that SoundPlayerContainer is constantly rerendered
    // This can cause weird problems
    // This also means we can have a progress bar for the song
    return (
      <div style={{textAlign: 'center'}}>
        <SoundPlayerContainer
          clientId='cbdd7f755416f67e838e272848d988d1'
          streamUrl={this.props.currentSong.url}
          ref='SoundPlayerContainer'
        />
        {this.props.currentSong.src === 'soundcloud' ?
          <img src='http://i.imgur.com/gkKut28.png' style={{width: '20%', height: '20%'}}/>
            : ''}
      </div>
    );
  }
}
