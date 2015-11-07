import React from 'react';
import styles from './App.css';
import History from '../History/History.js';
import Queue from '../Queue/Queue.js';
import Header from '../Header/Header.js';
import AddSong from '../AddSong/AddSong.js';
import AddModal from '../AddSong/AddModal.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <History />
        <Queue />
        <AddSong />
        <AddModal/>
      </div>

    );
  }
}
