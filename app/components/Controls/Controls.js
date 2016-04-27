import React from 'react';
import styles from './Controls.css';
import classNames from 'classnames';
import VolumeSlider from '../Volume/VolumeSlider.js';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);

    // Note: This should probably be a prop
    this.roomname = window.location.pathname.replace('/', '');
  }

  componentDidMount() {
    $('.ui.sticky')
    .sticky({
      context: 'body'
    });
    $('#Volume').on('mouseenter', () => this.refs.VolumeSlider.toggleVolumeOn());
    $('#Volume').on('mouseleave', () => this.refs.VolumeSlider.toggleVolumeOff());
  }

  handlePlay() {
    this.props.onPlaySong();
  }

  handlePause() {
    this.props.onPauseSong();
  }

  render() {
    // Everyone is owner for showcase
    const isOwner = localStorage.getItem(this.roomname) === 'owner';

    return (
      <div className={classNames('footer-controls', styles.footercontrols)}>
        <div className={classNames('row', styles.noOver)}>
          <div className={classNames('btn-group', 'btn-group-justified')} role='group' aria-label='...'>
            <div className={classNames('btn-group', styles.vol)} id='Volume' role='group'>
            {/*
              Old bootstrap styling that breaks slider
              <div type='button' className={classNames('btn', 'btn-default', 'btn-lg')}
              */}
                <VolumeSlider className={classNames(styles.icon)}
                  changeVolume={(volume) => this.props.changeVolume(volume)}
                  ref='VolumeSlider'
                />
            {/* </div> */}
            </div>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg', styles.mybtn)}
              onClick={() => this.props.isPlaying ? this.handlePause() : this.handlePlay()}>
                {this.props.isPlaying ? <img className={classNames(styles.icon)} src='http://i.imgur.com/ERX781m.png'/> : <img className={classNames(styles.icon)} src='http://i.imgur.com/c4Cj4rv.png'/> }
              </button>
            </div>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg', styles.mybtn)}
              onClick={() => this.props.nextReady && isOwner ? this.props.onNextSong() : console.error('Owner?', isOwner)}>
                <img className={classNames(styles.icon)} src='http://i.imgur.com/mHDFyMX.png'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
