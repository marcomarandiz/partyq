import React, { PropTypes } from 'react';
import styles from './HistorySonglist.css';
import HistorySong from '../HistorySong/HistorySong.js';
import classNames from 'classnames';
import notie from 'notie';

export default class HistorySonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  handleReAddSong(index) {
    this.props.onReAddSong(this.props.songs[index]);
  }

  render() {
    const historySongList = this.props.songs.map((song, index) => <HistorySong key={index}
      song={song} index={index} handleReAddSong={() => {
        this.handleReAddSong(index);
        notie.alert(1, 'Good job, bitch!', 2.5);
      }} />);
    return (
      <div className={classNames(styles.historysonglist)}>
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
