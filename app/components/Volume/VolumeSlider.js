import React from 'react';
// import classNames from 'classnames';

export default class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onUpdateVolume();
  }

  onUpdateVolume() {
    $('#slider1').change(() => {
      this.setVolume($('#slider1').val());
    });
  }

  setVolume(volume) {
    this.props.changeVolume(volume);
  }

  render() {
    return (
      <div>
        <p><input id='slider1' type='range' min='0' max='100' step='1' defaultValue='50' /></p>
      </div>
    );
  }
}
