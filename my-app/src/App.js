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
  <ul>
    <li>
      <Link to={`${match.path}/lynn`}>Lynn</Link>
    </li>
    <li>
      <Link to={`${match.path}/japan-guy`}>Japan Guy</Link>
    </li>
    <li>
      <Link to={`${match.path}/jisu-kimchi`}>Jisu Kimchi</Link>
    </li>
    <li>
      <Link to={`${match.path}/juan-malakas`}>Juan Malakas</Link>
    </li>

    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a contact</h3>}
    />
    <Route path={`${match.path}/:contactName`} component={Contact} />
  </ul>
);

export default App;
