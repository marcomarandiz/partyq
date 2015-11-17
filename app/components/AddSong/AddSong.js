import React, { PropTypes } from 'react';
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
         <div className='ui input focus'><input className={styles.songInput} ref='songname' type='text' className={styles.songURL} type='text' placeholder='Add Song...'/></div>
        </form>
      </div>
    );
  }
}

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
