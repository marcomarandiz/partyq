import React from 'react';
import styles from './AddModal.css';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className={styles.addmodal}>
        AddModal
        <input className={styles.songInput}/>
      </div>
    );
  }
}
