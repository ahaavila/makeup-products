import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import ProductsDetail from './containers/ProductsDetail/ProductsDetail';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={ProductsDetail} />
    </Switch>
  );
}