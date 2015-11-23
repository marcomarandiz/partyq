import React, { PropTypes } from 'react';
import styles from './Song.css';
import classNames from 'classnames';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames('ui', 'grid', 'segment', 'red ', styles.song)}>
          <div className={classNames('two', 'wide', 'column', 'center', 'aligned', styles.twosongbackground)}>
            <div>
              <i className={classNames('big', 'white', 'angle', 'up', 'link', 'icon', styles.upvoteButton)}
                 onClick={() => this.props.handleUpvote(this.props.index)}></i>
            </div>
            <div>
              {this.props.song.upvotes}
            </div>
          </div>
          <div className={classNames('five', 'wide', 'column', styles.fivesongbackground)}>
                  <div className={classNames(styles.thumbnail)}>
                      <a href={this.props.song.url}>
                        <img src={this.props.song.thumbnail}
                             className={classNames(styles.ytThumb)} />
                      </a>
                  </div>
                <div className={classNames(styles.songInfo)}>
                  <div className={classNames(styles.title)}>
                    {this.props.song.title ? this.props.song.title : 'Unknown title'}
                  </div>
                  <div className={classNames(styles.artist)}>
                    {this.props.song.artist ? this.props.song.artist : 'Unknown artist'}
                  </div>
                </div>
          </div>
          <div className={classNames('one', 'wide', 'column', styles.onesongbackground)}>
            <span className={classNames(styles.duration)}>{this.props.song.duration}</span>
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
