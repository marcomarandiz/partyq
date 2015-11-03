import React from 'react';
import styles from './CurrentSong.css';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.currentSong}>
        {this.props.currentSong}
      </div>
    );
  }
}
