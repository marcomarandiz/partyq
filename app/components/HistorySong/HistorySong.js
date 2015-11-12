import React from 'react';
import styles from './HistorySong.css';

export default class HistorySong extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.historysong}>
      {/* this is nasty and hardcoded, need to figure out how to fix spacing */}
        {this.props.song.song_name}
      </div>
    );
  }
}
