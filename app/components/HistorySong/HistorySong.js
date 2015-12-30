import React, { PropTypes } from 'react';
import styles from './HistorySong.css';
import classNames from 'classnames';

export default class HistorySong extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={classNames('ui', 'segment', 'red', styles.historysong)}>
        <div className={classNames(styles.historyContent)}>
          {this.props.song.title} {this.props.song.artist} {this.props.song.endedAt}
        </div>
        <button className={classNames('ui', 'tiny', 'button', styles.button)}
          type='button' onClick={() => this.props.handleReAddSong(this.props.index)}>
            Add to q
        </button>
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
