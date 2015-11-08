import React from 'react';
import styles from './App.css';
import History from '../History/History.js';
import Queue from '../Queue/Queue.js';
import Header from '../Header/Header.js';
import AddSong from '../AddSong/AddSong.js';
import { connect } from 'react-redux';
import { addSong } from '../actions/queue';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dispatch, queueSonglist } = this.props;
    return (
      <div className={styles.app}>
        <Header />
        <History />
        <Queue queueSonglist={queueSonglist} />
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
