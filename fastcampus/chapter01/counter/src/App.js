import React, { Component } from 'react';

import MyComponent from './components/MyComponent'
import Container from './containers/Container'
class App extends Component {
  render() {
    return (
      <div className="App">
        <MyComponent/>
      </div>
    );
  }
}

export default App;
