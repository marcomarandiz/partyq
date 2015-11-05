import React from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);

    this.songlist = this.props.queueSonglist;
  }

  render() {
    return (
        <div className={styles.queue}>
          <QueueSonglist songs={this.songlist} />
        </div>
    );
  }
}
