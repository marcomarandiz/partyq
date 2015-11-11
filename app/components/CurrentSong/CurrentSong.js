import React from 'react';
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
    return (
      // Formatting is nasty and hard coded and I copied it from Andrew :D
      <div className={styles.currentSong}>
        {this.props.currentSong.isPlaying ? 'Playing' : 'Paused'}:
        &nbsp;
        {this.props.currentSong.song_name}
        &nbsp;
        &nbsp;
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
