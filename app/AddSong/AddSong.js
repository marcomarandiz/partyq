import React from 'react';
import styles from './AddSong.css';
import addModal from './addModal.js';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick =  function(i) {
        console.log('You clicked: addmodal');
    };
  }
  render() {
    return (
      <div className={styles.addsong}>
        <button>AddSong</button>
      </div>
    );
  }
}
