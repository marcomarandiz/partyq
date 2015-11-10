import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.song}>
        <a href='#' onClick={() => this.props.handleUpvote(this.props.index)}>
          <img src='https://emoji.slack-edge.com//T0BPYMCNQ//steve//e3c6ac7cd44a97cf.jpg' alt='upvote' width='5%' height='5%'/>
        </a>
      {/*this is nasty and hardcoded, need to figure out how to fix spacing*/}
        &nbsp;
        &nbsp;
        &nbsp;
        {this.props.song.song_name}: {this.props.song.upvotes}
      </div>
    );
  }
}
