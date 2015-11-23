import React from 'react';
import styles from './Header.css';
import classNames from 'classnames';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.ui.sticky')
    .sticky({
      context: 'body'
    });
  }

  render() {
    return (
        <div className={classNames('ui', 'sticky', styles.header)}>
          <h1>partyq</h1>
        </div>
    );
  }
}
