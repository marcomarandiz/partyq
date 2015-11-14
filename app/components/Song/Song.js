import React from 'react';
import styles from './Song.css';

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.song}>
            <div>
                <a href='#' onClick={() => this.props.handleUpvote(this.props.index)} className={styles.upvote}>
                  <img src={require('./upvote-icon.png')} alt='upvote' width='1%' height='1%'/>
                </a><br/>
                {this.props.song.upvotes}
            </div>
      {/* this is nasty and hardcoded, need to figure out how to fix spacing */}
        &nbsp;
        &nbsp;
        &nbsp;
        <span>
            <img className={styles.thumbnail} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Q_logo_2015.svg/2000px-Q_logo_2015.svg.png' alt='thumbnail'/>
        </span>
        <span>
            <span className={styles.title}>Title</span>
            <span className={styles.artst}>Artist</span>
        </span>
        <span className={styles.length}>5:43</span>
      </div>
    );
  }
}
