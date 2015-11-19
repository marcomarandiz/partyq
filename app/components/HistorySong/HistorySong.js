import React, { PropTypes } from 'react';
import styles from './HistorySong.css';

export default class HistorySong extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.historysong}>
        <div className={styles.historyContent}>
          {this.props.song.title} {this.props.song.artist} {this.props.song.endedAt}
          <button type='button' onClick={() => this.props.handleReAddSong(this.props.index)} className={styles.button}>Add to q</button>
        </div>
      </div>
    );
  }
}

HistorySong.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired
  }).isRequired
};
