import React from 'react';
// import classNames from 'classnames';

export default class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateVolume();
  }

  updateVolume() {
    $('#slider1').change(() => {
      const newVolume = $('#slider1').val();
      this.props.changeVolume(newVolume);
      console.log(newVolume);
    });
    // this.props.changeVolume(this.newVolume);
  }

  render() {
    return (
      <div>
        <p><input id='slider1' type='range' min='0' max='100' step='1' defaultValue='50' /></p>
      </div>
    );
  }
}
