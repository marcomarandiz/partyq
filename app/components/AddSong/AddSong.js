import React, { PropTypes } from 'react';
import styles from './AddSong.css';
import { isLinkValid } from '../../../common/utils/functions.js';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }

  modal() {
    $('.ui.basic.modal')
      .modal({
        selector: {
          close: '.button'
        }
      }).modal('show')
    ;
  }

  dimSuccess() {
    $('.dimmer').css('background-color', 'rgba(48, 170, 255, 1)');
    $('#dimmerIcon').removeClass('frown');
    $('#dimmerIcon').addClass('checkmark');
    $('#dimmerTextMain').text('Song Added');
    $('#dimmerTextSecondary').text('');
    this.dim();
  }

  dimFailure() {
    $('.dimmer').css('background-color', 'rgba(255, 0, 0, 0.8)');
    $('#dimmerIcon').removeClass('checkmark');
    $('#dimmerIcon').addClass('frown');
    $('#dimmerTextMain').text('Invalid URL');
    $('#dimmerTextSecondary').text('Song Not Added');
    this.dim();
  }

  handleClick(event) {
    event.preventDefault();
    const node = this.refs.songname;
    const text = node.value.trim();
    if (isLinkValid(text)) {
      this.props.onAddSong(text);
      this.dimSuccess();
    } else {
      this.dimFailure();
      console.log('Invalid link: ' + text);
    }
    node.value = '';
  }

  dim() {
    $('.dimmable').dimmer('show').dimmer({duration: {show: 2000, hide: 0}}).dimmer('hide');
  }

  render() {
    return (
      <div className={styles.addsong}>
        {/* <div className='ui input focus'>
          <input ref='songname' type='text' className={styles.songURL} type='text' placeholder='Add Song...'/>
          <button className={'ui button ' + styles.addsongButton} onClick={() => this.handleClick(event)}>Add Song</button>
        </div> */}
        <span className={'link ' + styles.addIcon} onClick={() => this.modal()}>
          <i className='big add circle link icon'></i>Add Song
        </span>

        <div className={'ui basic modal ' + styles.modal}>
          <h1>Add a song:</h1>
          <div className={'ui icon input focus ' + styles.songURL}>
            <input ref='songname' type='text' className={styles.songURL} type='text' placeholder='Song URL...'/>
            <i className='add circle icon'></i>
          </div>
          <button className={'ui right labeled icon button ' + styles.addsongButton} onClick={() => this.handleClick(event)}>
            Add Song
            <i className='checkmark icon'></i>
          </button>
        </div>
      </div>
    );
  }
}

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
