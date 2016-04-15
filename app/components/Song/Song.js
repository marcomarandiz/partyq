import React, { PropTypes } from 'react';
import styles from './Song.css';
import classNames from 'classnames';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames(styles.song)} onClick={() => this.props.handleUpvote()}>
        { this.props.song.upvotes > 1
          ? <h4>{this.props.song.upvotes} upvotes</h4>
          : <h4>{this.props.song.upvotes} upvote</h4>
        }
        <div>
          <img src={this.props.song.thumbnail} className={classNames(styles.ytThumb)} />
        </div>
        <div>
          {this.props.song.title ? this.props.song.title : 'Unknown Title'}<br/>
          {this.props.song.artist ? this.props.song.artist : 'Unknown Artist'}
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
