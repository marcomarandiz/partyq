import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.song}>
        Im a song listen to me
      </div>
    );
  }
}
