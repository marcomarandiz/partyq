import React from 'react';
import styles from './Controls.css';
import classNames from 'classnames';
import VolumeSlider from '../Volume/VolumeSlider.js';

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.ui.sticky')
    .sticky({
      context: 'body'
    });
  }

  handlePlay() {
    this.props.onPlaySong();
  }

  handlePause() {
    this.props.onPauseSong();
  }

  render() {
    return (
      <div className={classNames('footer-controls', styles.footercontrols)}>
        <div className={classNames('row', styles.noOver)}>
          <div className={classNames('btn-group', 'btn-group-justified')} role='group' aria-label='...'>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg')}>
                Volume
              <VolumeSlider />
              </button>
            </div>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg')}
              onClick={() => this.props.isPlaying ? this.handlePause() : this.handlePlay()}>
                {this.props.isPlaying ? <img className={classNames(styles.icon)} src='http://i.imgur.com/ERX781m.png'/> : <img className={classNames(styles.icon)} src='http://i.imgur.com/c4Cj4rv.png'/> }
              </button>
            </div>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg')}
              onClick={() => this.props.nextReady ? this.props.onNextSong() : console.error('Next not ready yet.')}>
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
