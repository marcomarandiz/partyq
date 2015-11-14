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
          <img src={require('./upvote-icon.png')} alt='upvote' width='1%' height='1%'/>
        </a>
      {/* this is nasty and hardcoded, need to figure out how to fix spacing */}
        &nbsp;
        &nbsp;
        &nbsp;
        {this.props.song.song_name}: {this.props.song.upvotes}
      </div>
    );
  }
}
