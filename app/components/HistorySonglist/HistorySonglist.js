import React, { PropTypes } from 'react';
import styles from './HistorySonglist.css';
import HistorySong from '../HistorySong/HistorySong.js';

export default class HistorySonglist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const historySongList = this.props.songs.map((song, index) => <HistorySong key={index} song={song} />);
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
