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
    this.modal();
  }

  modal() {
    $('.ui.basic.modal')
      .modal({
        selector: {
          close: 'icon.checkmark'
        }
      }).modal('show')
      ;
  }

  render() {
    return (
      <div className={styles.addsong}>
          <form onSubmit={(event) => this.handleClick(event)}>
            <div className='ui input focus'>
              <input className={styles.songInput} ref='songname' type='text' className={styles.songURL} type='text' placeholder='Add Song...'/>
              <button className='ui button' onClick={() => this.handeClick(event)}>Add Song</button>
            </div>
          </form>

          <div className={'ui basic modal ' + styles.modal}>
            <div className={'actions ' + styles.modal}>
              <div className={'ui green basic inverted positive button ' + styles.modal}>
                <i className={'checkmark icon ' + styles.modal}></i>Song Added
              </div>
            </div>
          </div>
        </div>
    );
  }
}

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
