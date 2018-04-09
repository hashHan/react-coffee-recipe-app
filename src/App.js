import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Layout from './hoc/Layout/Layout';
import CoffeeMachine from './containers/CoffeeMachine/CoffeeMachine';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={CoffeeMachine} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
