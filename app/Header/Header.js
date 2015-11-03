import React from 'react';
import styles from './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.header}>
          <div className={styles.logo}>
            <h1>partyq</h1>
          </div>
          <div className={styles.nav}>
            <nav>
              <a href="#">&#9776;</a>
            </nav>
          </div>
        </div>
    );
  }
}
