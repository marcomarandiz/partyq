import React, { PropTypes } from 'react';
import styles from './History.css';
import HistorySonglist from '../HistorySonglist/HistorySonglist.js';
import classNames from 'classnames';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={classNames('ui', 'visible', 'inverted', 'left', 'vertical', 'sidebar', 'menu', styles.sidebar)}>
        <div className={classNames('ui', 'segments')}>
          <div className={styles.history}>
            <HistorySonglist songs={this.props.historySonglist} onReAddSong={this.props.onReAddSong} />
          </div>
        </div>
      </div>
    );
  }
}

History.propTypes = {
  historySonglist: PropTypes.arrayOf(PropTypes.object).isRequired
};
