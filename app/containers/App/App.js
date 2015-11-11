import React from 'react';
import styles from './App.css';
import History from '../../components/History/History.js';
import Queue from '../../components/Queue/Queue.js';
import Header from '../../components/Header/Header.js';
import AddSong from '../../components/AddSong/AddSong.js';
import { connect } from 'react-redux';
import { addSong } from '../../actions/queue';
import { upvoteSong } from '../../actions/song';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dispatch, queueSonglist, currentSong } = this.props;
    return (
      <div className={styles.app}>
        <Header />
        <History />
        <Queue queueSonglist={queueSonglist} currentSong={this.props.currentSong} onUpvoteSong={index =>
                                                           dispatch(upvoteSong(index))
                                                          } />

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
