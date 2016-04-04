import React from 'react';

export default class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Deals this bug where the VolumeSlider doesn't get rendered
    // when it wasn't already rendered and a Soundcloud song is added
    // I believe it's related to Soundcloud songs not updating the view
    this.toggleVolumeOff();
    this.forceUpdate();
  }

  setVolume(volume) {
    this.props.changeVolume(volume);
  }

  toggleVolumeOn() {
    document.getElementById('volume').style.display = 'block';
  }

  toggleVolumeOff() {
    document.getElementById('volume').style.display = 'none';
  }

  toggleVolume() {
    if (document.getElementById('volume').style.display === 'block') {
      this.toggleVolumeOff();
    } else {
      this.toggleVolumeOn();
    }
  }

  render() {
    $('#volume').slider({
      value: 50,
      orientation: 'vertical'
    });
    $('#volume').on('slide', (event, ui) => {
      this.setVolume(ui.value);
    });
    return (
      <div>
        <input
          type='button'
          value='volume'
          onClick={() => this.toggleVolume()}
        />
        <div id='volume' animate='true' default='50' />
      </div>
    );
  }
}
