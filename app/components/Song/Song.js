import React, { PropTypes } from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'ui grid ' + 'styles.song'}>
          <div className='two wide column'>
            <a href='#' onClick={() => this.props.handleUpvote(this.props.index)} className={styles.upvoteButton}>
              <i className={'big black angle up link icon ' + styles.icon}></i>
            </a>
              {this.props.song.upvotes}
          </div>
          <div className='five wide column'>
            <div className={styles.thumbnail}>
              <img className={styles.thumbnailImg} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Q_logo_2015.svg/2000px-Q_logo_2015.svg.png' alt='thumbnail'/>
              {/* replace image source above ^^ with actual thumbnail */}
            </div>
            <div className={styles.songInfo}>
              <div className={styles.title}>
                {this.props.song.title ? this.props.song.title : 'Unknown title'}
              </div>
              <div className={styles.artist}>
                {this.props.song.artist ? this.props.song.artist : 'Unknown artist'}
              </div>
            </div>
          </div>
          <div className='one wide column'>
            <span className={styles.duration}>5:43</span>
          </div>
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
