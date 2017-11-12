import React, { Component } from 'react';
import { Link } from 'react-router';

// Styles
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <nav
          className="navbar pure-menu pure-menu-horizontal"
          style={{ zIndex: 1 }}
        >
          <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
          <ul className="pure-menu-list navbar-right">
            <li className="pure-menu-item">
              <Link to="/postslist" className="pure-menu-link">Twitter Posts</Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
