import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.song}>

        <a href='#' onClick={() => this.props.handleUpvote(this.props.index)}>asdf</a>&nbsp;&nbsp;&nbsp;index: {this.props.index}
        {this.props.song.song_name}: {this.props.song.upvotes}
      </div>
    );
  }
}
