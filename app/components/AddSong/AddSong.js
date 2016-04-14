import React, { PropTypes } from 'react';
import { isLinkValid } from '../../../common/utils/functions.js';
import classNames from 'classnames';
import notie from 'notie';

export default class AddSong extends React.Component {
  constructor(props) {
    super(props);
  }

  addSong() {
    const text = this.refs.addsong;
    const url = text.value.trim();
    if (isLinkValid(url)) {
      this.props.onAddSong(url);
    } else {
      notie.alert(3, 'Invalid URL: song not added', 2.5);
    }
    this.refs.addsong.value = '';
  }

  render() {
    return (
        <div className={classNames('row')}>
           <div className={classNames('col-md-6', 'col-md-offset-3')} id='room'>

             <div className={classNames('input-group')}>
               <input ref='addsong' type='text' className={classNames('form-control')}/>
               <span className={classNames('input-group-btn')}>
                 <button className={('btn btn-default')} type='button'
                 onClick={() => this.addSong()}>
                   Add Song
                 </button>
               </span>
             </div>
           </div>
         </div>
    );
  }
}

  /*
      <div className={classNames(styles.addsong)}>
        <span className={classNames('link', styles.addIcon)} onClick={() => this.showModal()}>
          <i className={classNames('big', 'add', 'circle', 'link', 'icon')}></i>
          Add Song
        </span>

        <div className={classNames('ui', 'basic', 'modal', styles.modal)}>
          <h1>Add a song:</h1>
          <form>
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
      </div>*/

AddSong.propTypes = {
  onAddSong: PropTypes.func.isRequired
};
