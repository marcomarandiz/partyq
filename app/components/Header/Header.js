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
      <nav className={classNames('navbar', 'navbar-default', 'navbar-fixed-top', 'mainNav')}>
        <div className={classNames('container-fluid')}>
          <div className={classNames('navbar-header')}>
            <button type='button' className={classNames('navbar-toggle', 'collapsed')} data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
              <span className={classNames('sr-only')}>Toggle navigation</span>
              <span className={classNames('icon-bar')}></span>
              <span className={classNames('icon-bar')}></span>
              <span className={classNames('icon-bar')}></span>
            </button>
            <a className={classNames('navbar-brand', 'page-scroll')} href='#page-top'><img src='http://i.imgur.com/gOxrFtn.png'/></a>
          </div>

          <div className={classNames('collapse', 'navbar-collapse', styles.topnav)}>
            <ul className={classNames('nav navbar-nav', 'navbar-right')}>
              <li>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'info', 'icon')} style={{float: 'right'}}></i>
              </li>
              <li>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'facebook', 'icon')} style={{float: 'right'}}></i>
              </li>
              <li>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'twitter', 'icon')} style={{float: 'right'}}></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
