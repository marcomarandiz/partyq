import React, { PropTypes } from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'ui grid segment ' + styles.song}>
          <div className={'four wide column center aligned ' + styles.twosongbackground}>
            <div>
              <i className={'big white angle up link icon ' + styles.upvoteButton} onClick={() => this.props.handleUpvote(this.props.index)}></i>
            </div>
            <div>
              {this.props.song.upvotes}
            </div>
          </div>
          <div className={'ten wide column ' + styles.fivesongbackground}>
                  <div className={styles.thumbnail}>
                      <a href={this.props.song.url}><img src={this.props.song.thumbnail} className={styles.ytThumb} /></a>
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
          <div className={'two wide column ' + styles.onesongbackground}>
            <span className={styles.duration}>{this.props.song.duration}</span>
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
