import React from 'react';
import styles from './Header.css';
import classNames from 'classnames';
import AddSong from '../../components/AddSong/AddSong.js';
import { addSong, addSongRequest } from '../../../common/actions/queueActions';



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
          <div className={classNames(styles.addSong)}>
            <AddSong onAddSong={songName => dispatch(addSongRequest(songName))}/>
          </div>
          <h1>partyq</h1>
        </div>
    );
  }
}
