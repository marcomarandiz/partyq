import React from 'react';

export default class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Deals this bug where the VolumeSlider doesn't get rendered
    // when it wasn't already rendered and a Soundcloud song is added
    // I believe it's related to Soundcloud songs not updating the view
    this.forceUpdate();
  }

  setVolume(volume) {
    this.props.changeVolume(volume);
  }

  render() {
    $('#volume').slider({
      value: 50
    });
    $('#volume').on('slide', (event, ui) => {
      this.setVolume(ui.value);
    });
    return (
      <div>
        <div id='volume' animate='true' default='50' />
      </div>
    );
  }
}
