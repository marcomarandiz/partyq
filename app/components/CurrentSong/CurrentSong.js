import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';
import styles from './CurrentSong.css';

export default class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlay() {
    this.props.onPlaySong();
    this.youtube.playVideo();
  }

  handlePause() {
    this.props.onPauseSong();
    this.youtube.pauseVideo();
  }

  handleNextSong() {
    this.props.onNextSong();
  }

  _onReady(event, context) {
    // Set the playing status to true
    context.props.onPlaySong();

    // Max the volume out
    event.target.setVolume(100);

    // context = this from react
    // this = this for this function to Youtube API
    context.youtube = event.target;
    console.log(context);
  }

  _onEnd(event, context) {
    // Handles events at the end of a song
    // context.youtube = event.target;
    context.handleNextSong();
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1, // enables autoplay
        disablekb: 0 // disables keyboard controls
      }
    };

    // Make sure that play/pause stays up to date between clients
    if (this.youtube && this.props.isPlaying) {
      this.youtube.playVideo();
    } else if (this.youtube && ! this.props.isPlaying) {
      this.youtube.pauseVideo();
    }

    return (
      // Formatting is nasty and hard coded and I copied it from Andrew :D
      <div className={styles.currentSong}>
        <YouTube
          url={this.props.currentSong.url}
          opts={opts}
          onReady={(event) => this._onReady(event, this)}
          onEnd={(event) => this._onEnd(event, this)}
        />
        {this.props.currentSong.title}
        &nbsp;
        &nbsp;
        <player/>

        {this.props.isPlaying ?
         <ui onClick={() => this.handlePause()}><i className='pause icon'></i></ui> :
         <ui onClick={() => this.handlePlay()}><i className='play icon'></i></ui>}
        &nbsp;
        &nbsp;
        <ui onClick={() => this.handleNextSong()}><i className='step forward icon'></i></ui>
      </div>
    );
  }
}

// Ensure that props are passed down properly
CurrentSong.propTypes = {
  currentSong: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    artist: PropTypes.string,
    src: PropTypes.string,
    uploadDate: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  onPlaySong: PropTypes.func.isRequired,
  onPauseSong: PropTypes.func.isRequired,
  onNextSong: PropTypes.func.isRequired
};
