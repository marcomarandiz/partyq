import React, { PropTypes } from 'react';
import styles from './History.css';
import HistorySonglist from '../HistorySonglist/HistorySonglist.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.history}>
        <HistorySonglist songs={this.props.historySonglist} />
      </div>
    );
  }
}

History.propTypes = {
  historySonglist: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};
