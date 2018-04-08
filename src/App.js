import React, { Component } from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import Coffeecss from './components/Coffeecss/Coffeecss';

class App extends Component {
  render() {
    return (
      <div className="App">
        App
        <Layout>
          <Coffeecss />
        </Layout>
      </div>
    );
  }
}

export default App;
