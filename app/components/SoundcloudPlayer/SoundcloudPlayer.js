import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';

export default class SoundcloudPlayer extends React.Component {
  render() {
    if (this.props.currentSong.src === 'soundcloud') {
      const scPlayer = new SoundCloudAudio('cbdd7f755416f67e838e272848d988d1');
      scPlayer.audio.autoplay = true;
      scPlayer.play({streamUrl: this.props.currentSong.url});
      console.log(scPlayer);
    }
    return (
      <div>
        Im soundcloud player
      </div>
    );
  }
}
