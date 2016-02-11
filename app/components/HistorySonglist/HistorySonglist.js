import React, { PropTypes } from 'react';
import HistorySong from '../HistorySong/HistorySong.js';

export default class HistorySonglist extends React.Component {
  constructor(props) {
    super(props);
  }

  handleReAddSong(index) {
    this.props.onReAddSong(this.props.songs[index]);
  }

  render() {
    const historySongList = this.props.songs.map((song, index) => <HistorySong key={index}
      song={song} index={index} handleReAddSong={() => {this.handleReAddSong(index);}} />);

    return ( <div> {historySongList} </div> );
  }
}

HistorySonglist.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
