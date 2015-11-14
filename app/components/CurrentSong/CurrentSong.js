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
  }

  handlePause() {
    console.log('pause');
    this.props.onPauseSong();
  }

  handleNextSong() {
    console.log('next song');
    this.props.onNextSong();
  }

  render() {
    const opts = {
      height: '10',
      width: '10',
      playerVars: {
        autoplay: 1, // enables autoplay
        disablekb: 0 // disables keyboard controls
      }
    };
    return (
      // Formatting is nasty and hard coded and I copied it from Andrew :D
      <div className={styles.currentSong}>
        <YouTube url={this.props.currentSong.song_name} opts={opts} />
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
