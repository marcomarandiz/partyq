import React from 'react';
import styles from './History.css';
import HistorySonglist from '../HistorySonglist/HistorySonglist.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.history}>
        <HistorySonglist songs = {['Trap Queen', 'See You Again', 'Sorry']} />
      </div>
    );
  }
}
