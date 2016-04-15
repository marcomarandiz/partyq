import React, { PropTypes } from 'react';
import styles from './Song.css';
import classNames from 'classnames';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.handleUpvote()}>
        {this.props.song.upvotes}
          <a href={this.props.song.url}>
            <img src={this.props.song.thumbnail} className={classNames(styles.ytThumb)} />
          </a>
        {this.props.song.title ? this.props.song.title : 'Unknown Title'}
        {this.props.song.artist ? this.props.song.artist : 'Unknown Artist'}
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

