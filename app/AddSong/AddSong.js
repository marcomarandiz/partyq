import React from 'react';
import styles from './AddSong.css';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    const node = this.refs.songname;
    const text = node.value.trim();
    console.log(event);
    this.props.onAddSong(text);
    node.value = '';
  }

  render() {
    return (
      <div className={styles.addsong}>
        <input className={styles.songInput} ref='songname' type='text' />
        <button onClick={(event) => this.handleClick(event)}>
          AddSong
        </button>
      </div>
    );
  }
}
