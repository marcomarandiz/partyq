import React from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist.js';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queue}>
          <QueueSonglist songs={this.props.queueSonglist} onUpvoteSong={this.props.onUpvoteSong} />
        </div>
    );
  }
}
