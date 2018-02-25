import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import Vis from './Vis.js';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.App__header}>
          <h1 className={styles.App__title}>Welcome to React</h1>
        </header>
        <Vis />
        <p className={styles.App__intro}>
          To get started, edit <code>src/App.js</code> and save to reload hohoho.
        </p>
      </div>
    );
  }
}

export default App;
