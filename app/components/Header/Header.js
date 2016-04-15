import React from 'react';
import styles from './Header.css';
import classNames from 'classnames';
import AddSong from '../../components/AddSong/AddSong.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
  }

  componentDidMount() {
    $('.ui.sticky')
    .sticky({
      context: 'body'
    });
  }

  goToFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href));
  }

  goToTwitter() {
    window.open('https://twitter.com/intent/tweet' +
      '?text=' + encodeURIComponent('Because the party is better when you\'re the DJ!') +
      '&url=' + encodeURIComponent(location.href));
  }

  render() {
    return (
      <nav className={classNames('navbar', 'navbar-default', 'navbar-fixed-top', styles.mainNav)}>
        <div className={classNames('container-fluid')}>
          <div className={classNames('navbar-header')}>
            <button type='button' className={classNames('navbar-toggle', 'collapsed')} data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
              <span className={classNames('sr-only')}>Toggle navigation</span>
              <span className={classNames('icon-bar')}></span>
              <span className={classNames('icon-bar')}></span>
              <span className={classNames('icon-bar')}></span>
            </button>
            <a className={classNames('navbar-brand')} href='#page-top'><img className={classNames(styles.logo)} width='125' height='54' src='http://i.imgur.com/ib1ZmYy.png'/></a>
          </div>

          <AddSong onAddSong={(link) => this.props.onAddSong(link)} />

          <div className={classNames('collapse', 'navbar-collapse', styles.topnav)}>
            <ul className={classNames('nav navbar-nav', styles.navbarRight)}>
              <li>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'info', 'icon')} style={{float: 'right'}}></i>
              </li>
              <li onClick={this.goToFacebook}>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'facebook', 'icon')} style={{float: 'right'}}></i>
              </li>
              <li onClick={this.goToTwitter}>
                <i className={classNames('inverted', 'blue', 'large', 'circular', 'twitter', 'icon')} style={{float: 'right'}}></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
