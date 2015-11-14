import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.song}>
        <a href='#' onClick={() => this.props.handleUpvote(this.props.index)} className={styles.upvote}>
          <img src='upvote-icon.png' alt='upvote'/>
        </a>
      {/* this is nasty and hardcoded, need to figure out how to fix spacing */}
        &nbsp;
        &nbsp;
        &nbsp;
        <span className={styles.songInfo}>
          {this.props.song.song_name}: {this.props.song.upvotes}
        </span>
      </div>
    );
  }
}
