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
      <div className={styles.currentSong}>
        {this.props.currentSong.song_name}
        <a href='#' onClick={() => this.handlePlay()}>
          <img src='https://emoji.slack-edge.com//T0BPYMCNQ//steve//e3c6ac7cd44a97cf.jpg' alt='play' width='8%' height='100%'/>
        </a>
        <a href='#' onClick={() => this.handlePause()}>
          <img src='https://emoji.slack-edge.com//T0BPYMCNQ//steve//e3c6ac7cd44a97cf.jpg' alt='pause' width='8%' height='100%'/>
        </a>
      </div>
    );
  }
}
