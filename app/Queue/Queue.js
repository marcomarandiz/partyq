import React from 'react';
import styles from './Queue.css';
import QueueSonglist from '../QueueSonglist/QueueSonglist';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queue}>
          <QueueSonglist songs={['Trap Queen', 'See You Again', 'Sorry']} />
        </div>
    );
  }
}
