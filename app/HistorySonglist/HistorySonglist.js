import React from 'react';
import styles from './HistorySonglist.css';
import Song from '../Song/Song.js';

export default class HistorySonglist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const historySongList = this.props.songs.map((song, index) => <Song key={index} song={song} />);
    return (
      <div className={styles.historysonglist}>
        {historySongList}
      </div>
    );
  }
}
