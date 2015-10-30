import React from 'react';
import styles from './History.css';
import historySonglist from '../historySonglist/historySonglist.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.history}>
            History
            <historySonglist />
        </div>
    );
  }
}
