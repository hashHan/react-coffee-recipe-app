import React, { Component } from 'react';
import './App.scss';

import Layout from './hoc/Layout/Layout';
import Coffeemenu from './components/Coffeemenu/Coffeemenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        App
        <Layout>
          <Coffeemenu />
        </Layout>
      </div>
    );
  }
}

export default App;
