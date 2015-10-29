import React from 'react';
import styles from './App.css';
import History from '../History/History.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        partyq
        <History />
      </div>
    );
  }
}
