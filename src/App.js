import React, { Component } from 'react';
import './App.scss';

import Layout from './hoc/Layout/Layout';
import CoffeeMachine from './containers/CoffeeMachine/CoffeeMachine';

class App extends Component {
  render() {
    return (
      <div className="App">
        App
        <Layout>
          <CoffeeMachine />
        </Layout>
      </div>
    );
  }
}

export default App;
