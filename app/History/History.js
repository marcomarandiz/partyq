import React from 'react';
import styles from './History.css';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.history}>
            History
            <History_Songlist />
        </div>
    );
  }
}
