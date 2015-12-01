import React, { PropTypes } from 'react';
import styles from './AddSong.css';
import { isLinkValid } from '../../../common/utils/functions.js';
import classNames from 'classnames';
import notie from 'notie';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }

  showModal() {
    $('.ui.basic.modal').modal({
      transition: 'slide down',
      onApprove: () => {
        const node = this.refs.songname;
        const text = node.value.trim();
        if (isLinkValid(text)) {
          this.props.onAddSong(text);
      //  this.dimSuccess();
        } else {
      //    this.dimFailure();
          notie.alert(3, 'Invalid URL: song not added', 2.5);
        }
        node.value = '';
        return true;
      },
      selector: { approve: '.button', close: '.button' }
    }).modal('show');
  }

  handleClick(event) {
    event.preventDefault();
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
          <form onSubmit={(event) => this.handleClick(event)}>
            <div className={classNames('ui', 'icon', 'input', 'focus', styles.songURL)}>
              <input ref='songname' type='text' className={classNames(styles.songURL)} type='text' placeholder='Song URL...'/>
              <i className={classNames('add', 'circle', 'icon')}></i>
            </div>
            <button id='addModalButton' type='submit' className={classNames('ui', 'right', 'labeled', 'ok', 'icon', 'button', styles.addsongButton)}>
                Add Song
              <i className={classNames('checkmark', 'icon')}></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
