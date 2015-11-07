import React from 'react';
import styles from './History.css';
import HistorySonglist from '../HistorySonglist/HistorySonglist.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.history}>
        <HistorySonglist songs = {[{song_name: 'song-one', upvotes: 0}, {song_name: 'song-two', upvotes: 0}]} />
      </div>
    );
  }
}
