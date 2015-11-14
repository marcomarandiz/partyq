import React from 'react';
import styles from './AddSong.css';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    event.preventDefault();
    const node = this.refs.songname;
    const text = node.value.trim();
    console.log(event);
    this.props.onAddSong(text);
    node.value = '';
  }

  render() {
    return (
      <div className={styles.addsong}>
        <form onSubmit={(event) => this.handleClick(event)}>
          <input className={styles.songInput} ref='songname' type='text' className={styles.songURL}/>
          <button type='submit' className={styles.addButton}>
            Add Song
          </button>
        </form>
      </div>
    );
  }
}
