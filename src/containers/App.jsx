import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-static';
import Routes from 'react-static-routes';
import 'normalize.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import store from '../redux/store';
import history from '../history';
import SmashTierList from './SmashTierList';

import '../index.css';

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="*" render={({ location }) => SmashTierList({ route: location.pathname })} />
        <Routes />
      </Switch>
    </Router>
  </Provider>
);
