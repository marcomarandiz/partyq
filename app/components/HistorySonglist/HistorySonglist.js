import React, { PropTypes } from 'react';
import styles from './HistorySonglist.css';
import HistorySong from '../HistorySong/HistorySong.js';

export default class HistorySonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  handleReAddSong(index) {
    console.log('handled');
    this.props.onReAddSong(index);
  }

  render() {
    const historySongList = this.props.songs.map((song, index) => <HistorySong key={index}
      song={song} index={index} handleReAddSong={() => this.handleReAddSong(index)} />);
    return (
      <div className={styles.historysonglist}>
        {historySongList}
      </div>
    );
  }
}

HistorySonglist.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
