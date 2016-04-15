import React, { PropTypes } from 'react';
import QueueSonglist from '../QueueSonglist/QueueSonglist.js';
import CurrentSong from '../CurrentSong/CurrentSong.js';
import classNames from 'classnames';
import styles from './Queue.css';
import { isMobile } from '../../utils/functions.js';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (isMobile()) {
      return (
        <div className={classNames(styles.content)}>
          <div className={classNames('row')}>
            <div id='video-box' className={classNames('col-md-7', styles.mobilevideo)}>
              {this.props.currentSong !== null ?
                <CurrentSong
                  currentSong={this.props.currentSong}
                  onPlaySong={() => this.props.onPlaySong()}
                  onPauseSong={() => this.props.onPauseSong()}
                  onNextSong={() => this.props.onNextSong()}
                  onNextReady={() => this.props.onNextReady()}
                  isPlaying={this.props.isPlaying}
                  ref='CurrentSong'
                />
              : ''}
            </div>
            <QueueSonglist songs={this.props.songlist} onUpvoteSong={this.props.onUpvoteSong} />
          </div>
        </div>
      );
    }
    return (
      <div className={classNames(styles.content)}>
        <div className={classNames('row')}>
          <div id='video-box' className={classNames('col-md-7', styles.video)}>
            {this.props.currentSong !== null ?
              <CurrentSong
                currentSong={this.props.currentSong}
                onPlaySong={() => this.props.onPlaySong()}
                onPauseSong={() => this.props.onPauseSong()}
                onNextSong={() => this.props.onNextSong()}
                onNextReady={() => this.props.onNextReady()}
                isPlaying={this.props.isPlaying}
                ref='CurrentSong'
              />
            : ''}
          </div>
          <QueueSonglist songs={this.props.songlist} onUpvoteSong={this.props.onUpvoteSong} />
        </div>
      </div>
      );
  }
}

Queue.propTypes = {
  // This should be required, but we are passing it in as null...
  currentSong: PropTypes.object,
  onPlaySong: PropTypes.func.isRequired,
  onPauseSong: PropTypes.func.isRequired,
  onNextSong: PropTypes.func.isRequired,
  onUpvoteSong: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  songlist: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};


      // // Only show current song if there is one
      //   <div>
      //     {this.props.currentSong !== null ?
      //       <CurrentSong
      //         currentSong={this.props.currentSong}
      //         onPlaySong={() => this.props.onPlaySong()}
      //         onPauseSong={() => this.props.onPauseSong()}
      //         onNextSong={() => this.props.onNextSong()}
      //         onNextReady={() => this.props.onNextReady()}
      //         isPlaying={this.props.isPlaying} />
      //     : ''}
      //     <QueueSonglist songs={this.props.songlist} onUpvoteSong={this.props.onUpvoteSong} />
      //   </div>
