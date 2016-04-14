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
    $('#Volume').on('mouseenter', () => this.refs.VolumeSlider.toggleVolumeOn());
    $('#Volume').on('mouseleave', () => this.refs.VolumeSlider.toggleVolumeOff());
    console.log(this);
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
        <div className={classNames('row')}>
          <div className={classNames('btn-group', 'btn-group-justified')} role='group' aria-label='...'>
            <div className={classNames('btn-group')} id='Volume' role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg')}>
                <VolumeSlider
                  ref='VolumeSlider'
                />
              </button>
            </div>
            <div className={classNames('btn-group')} role='group'>
              <button type='button' className={classNames('btn', 'btn-default', 'btn-lg')}
              onClick={() => this.props.isPlaying ? this.handlePause() : this.handlePlay()}>
                {this.props.isPlaying ? <div>Pause</div> : <div>Play</div>}
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

