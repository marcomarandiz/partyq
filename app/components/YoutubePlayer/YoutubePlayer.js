import React from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames';

export default class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  _onReady(event, context) {
    // Autoplay if isPlaying = true
    if (context.props.isPlaying) {
      event.target.playVideo();
    }

    // Max the volume out
    event.target.setVolume(100);

    // context = this from react
    // this = this for this function to Youtube API
    context.youtube = event.target;
    context.props.onNextReady();
  }

  _onEnd(event, context) {
    // Handles events at the end of a song
    // context.youtube = event.target;
    context.props.onNextSong();
  }

  pause() {
    this.youtube.pauseVideo();
  }

  play() {
    this.youtube.playVideo();
  }

  render() {
    const opts = {
      height: '300',
      width: '100%',
      playerVars: {
        autoplay: 0, // enables autoplay
        disablekb: 0 // disables keyboard controls
      }
    };
    return (
      <div className={classNames()}>
        {(this.props.currentSong.url && this.props.currentSong.src === 'youtube') ?
          <YouTube
          url={this.props.currentSong.url}
          opts={opts}
          onReady={(event) => this._onReady(event, this)}
          onEnd={(event) => this._onEnd(event, this)}/> : ''}
      </div>
    );
  }
}
