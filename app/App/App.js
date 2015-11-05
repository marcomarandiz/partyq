import React from 'react';
import styles from './App.css';
import History from '../History/History.js';
import Queue from '../Queue/Queue.js';
import Header from '../Header/Header.js';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { queueSonglist } = this.props;
    return (
      <div className={styles.app}>
        <Header />
        <History />
        <Queue queueSonglist={queueSonglist} />
      </div>

    );
  }
}

// Get the items from state
function select(state) {
  return {
    queueSonglist: state.queueSonglist
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
