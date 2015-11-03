import React from 'react';
import styles from './QueueSonglist.css';

export default class QueueSonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queueSonglist}>
          Queuesonglist
        </div>
    );
  }
}
