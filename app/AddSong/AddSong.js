import React from 'react';
import styles from './AddSong.css';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.addsong}>
        <button>AddSong</button>
      </div>
    );
  }
}
