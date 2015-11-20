import React, { PropTypes } from 'react';
import styles from './History.css';
import HistorySonglist from '../HistorySonglist/HistorySonglist.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className={'ui visible inverted left raised vertical sidebar menu ' + styles.sidebar}>
          <div className='ui segments'>
              <div className={styles.history}>
                <HistorySonglist
                  songs={this.props.historySonglist}
                  onReAddSong={this.props.onReAddSong}
                />
              </div>
          </div>
      </div>

    );
  }
}

History.propTypes = {
  historySonglist: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
