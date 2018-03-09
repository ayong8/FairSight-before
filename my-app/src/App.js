import React from 'react';
import { Route, Link } from 'rect-router-dom';
import styles from './App.scss';
import Vis from './Vis.js';

const App = () => (
  <div>
    <Header />
  </div>
);

const Header = () => (
  <header>
    <h1>My Contacts</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contacts">Contacts</Link>
      </li>
    </ul>
    <Route exact path="/" component={Welcome} />
    <Route path="/contacts" component={Contacts} />
  </header>
);

const Welcome = ({ match }) => <h1>Welcome to our app</h1>;

const Contacts = ({ match }) => (
  <div>
    <ul>
      <li>Lynn</li>
    </ul>
  </div>
);

export default App;
