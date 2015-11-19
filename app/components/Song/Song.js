import React, { PropTypes } from 'react';
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
                  <i className='big white angle up link icon'></i>
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
            {/* <img className={styles.thumbnailImg} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Q_logo_2015.svg/2000px-Q_logo_2015.svg.png' alt='thumbnail'/> */}
            {/* replace image source above ^^ with actual thumbnail */}
            <i className='big youtube square icon'></i>
        </div>
        <div className={styles.songInfo}>
        <div className={styles.title}>
          {this.props.song.title ? this.props.song.title : 'Unknown title'}
        </div>
        <div className={styles.artist}>
          {this.props.song.artist ? this.props.song.artist : 'Unknown artist'}
        </div>
        </div>
        <span className={styles.duration}>5:43</span>
      </div>
    );
  }
}

Song.propTypes = {
  handleUpvote: PropTypes.func.isRequired,
  // The index of this song in the songlist
  index: PropTypes.number.isRequired,
  song: PropTypes.shape({
    upvotes: PropTypes.number.isRequired
  })
};
