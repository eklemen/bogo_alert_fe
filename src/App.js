import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CookiesProvider>
          <Routes />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
