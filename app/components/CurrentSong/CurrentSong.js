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

  render() {
    return (
      // Formatting is nasty and hard coded and I copied it from Andrew :D
      <div className={styles.currentSong}>
        {this.props.currentSong.song_name}
        &nbsp;
        &nbsp;
        <button type='button' onClick={() => this.handlePlay()}> Play </button>
        &nbsp;
        &nbsp;
        <button type='button' onClick={() => this.handlePause()}> Pause </button>
      </div>
    );
  }
}
