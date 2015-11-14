import React from 'react';
import YouTube from 'react-youtube';
import styles from './CurrentSong.css';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlay() {
    console.log('play');
    this.props.onPlaySong();
    this.youtube.playVideo();
  }

  handlePause() {
    console.log('pause');
    this.props.onPauseSong();
    // console.log(this.youtube);
    this.youtube.pauseVideo();
  }

  handleNextSong() {
    console.log('next song');
    this.props.onNextSong();
  }

  _onReady(event, context) {
    // context = this from react
    // this = this for this function to Youtube API
    event.target.setVolume(100);
    context.youtube = event.target;
    console.log(context);
  }

  _onEnd(event, context) {
    // Handles events at the end of a song
    // context.youtube = event.target;
    context.handleNextSong();
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1, // enables autoplay
        disablekb: 0 // disables keyboard controls
      }
    };

    return (
      // Formatting is nasty and hard coded and I copied it from Andrew :D
      <div className={styles.currentSong}>
        <YouTube
          url={this.props.currentSong.song_name}
          opts={opts}
          onReady={(event) => this._onReady(event, this)}
          onEnd={(event) => this._onEnd(event, this)}
        />
        {this.props.currentSong.isPlaying ? 'Playing' : 'Paused'}:
        &nbsp;
        {this.props.currentSong.song_name}
        &nbsp;
        &nbsp;
        <player/>
        <button type='button' onClick={() => this.handlePlay()}> Play </button>
        &nbsp;
        &nbsp;
        <button type='button' onClick={() => this.handlePause()}> Pause </button>
        &nbsp;
        &nbsp;
        <button type='button' onClick={() => this.handleNextSong()}> Next </button>
      </div>
    );
  }
}
