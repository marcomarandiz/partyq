import React from 'react';
import styles from './Queue.css';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.queue}>
            Queue
        </div>
    );
  }
}
