import React, { PropTypes } from 'react';
import styles from './AddSong.css';
import { isLinkValid } from '../../../common/utils/functions.js';
import classNames from 'classnames';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
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

  dim() {
    $('.dimmable').dimmer('show').dimmer({duration: {show: 2000, hide: 0}}).dimmer('hide');
  }

  showModal() {
    console.log('fired');
    $('.ui.basic.modal').modal({
      transition: 'slide down',
      onApprove: () => {
        console.log('on approve fired');
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
        return true;
      },
      selector: { approve: '.button', close: '.button' }
    }).modal('show');
  }


  render() {
    return (
      <div className={classNames(styles.addsong)}>
        <span className={classNames('link', styles.addIcon)} onClick={() => this.showModal()}>
          <i className={classNames('big', 'add', 'circle', 'link', 'icon')}></i>
          Add Song
        </span>

        <div className={classNames('ui', 'basic', 'modal', styles.modal)}>
          <h1>Add a song:</h1>
          <div className={classNames('ui', 'icon', 'input', 'focus', styles.songURL)}>
            <input ref='songname' type='text' className={classNames(styles.songURL)} type='text' placeholder='Song URL...'/>
            <i className={classNames('add', 'circle', 'icon')}></i>
          </div>
          <button className={classNames('ui', 'right', 'labeled', 'ok','icon', 'button', styles.addsongButton)}>
            Add Song
          <i className={classNames('checkmark', 'icon')}></i>
          </button>
        </div>
      </div>
    );
  }
}

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
