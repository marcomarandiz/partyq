import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.song}>
            <div className={styles.upvote}>
                <a href='#' onClick={() => this.props.handleUpvote(this.props.index)} className={styles.upvoteButton}>
                  <img src={require('./upvote-icon.png')} alt='upvote' width='35%' height='35%'/>
                </a>
                <div className={styles.upvoteCount}>
                    {this.props.song.upvotes}
                </div>
            </div>
      {/* this is nasty and hardcoded, need to figure out how to fix spacing */}
        &nbsp;
        &nbsp;
        &nbsp;
        <div className={styles.thumbnail}>
            <img className={styles.thumbnailImg} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Q_logo_2015.svg/2000px-Q_logo_2015.svg.png' alt='thumbnail'/>
            {/* replace image source above ^^ with actual thumbnail */}
        </div>
        <div className={styles.songInfo}>
            <div className={styles.title}>{this.props.song.title}</div>
            <div className={styles.artist}>{this.props.song.artist}</div>
        </div>
        <span className={styles.duration}>5:43</span>
      </div>
    );
  }
}
