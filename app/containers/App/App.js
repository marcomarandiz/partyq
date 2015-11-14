import React from 'react';
import styles from './App.css';
import History from '../../components/History/History.js';
import Queue from '../../components/Queue/Queue.js';
import Header from '../../components/Header/Header.js';
import AddSong from '../../components/AddSong/AddSong.js';
import { connect } from 'react-redux';
import { addSong } from '../../actions/queue';
import { upvoteSong } from '../../actions/song';
import nextSong from '../../actions/nextSong';
import { playSong, pauseSong } from '../../actions/currentSong';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  pasteLink(event) {
    const link = event.clipboardData.getData('Text').trim();
    console.log(link);
    return link;
    /* dispatch(addSong(link)) ; */
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className={styles.app} onPaste={(event) => dispatch(addSong(this.pasteLink(event)))}>
        <Header />
        <History historySonglist={this.props.history.songlist} />
        <Queue
          currentSong={this.props.queue.currentSong}
          songlist={this.props.queue.songlist}
          onPlaySong={() => dispatch(playSong())}
          onPauseSong={()=> dispatch(pauseSong())}
          queueSonglist={this.props.queue.songlist}
          onUpvoteSong={index => dispatch(upvoteSong(index))}
          onNextSong={() => dispatch(nextSong())} />
        <AddSong onAddSong={songName =>
                            dispatch(addSong(songName))
                            }/>
      </div>
    );
  }
}

// Get the items from state
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
