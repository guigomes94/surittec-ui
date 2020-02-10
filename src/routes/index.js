import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/signIn';
import Dashboard from '../pages/dashboard';
import Create from '../pages/create';
import Detalhes from '../pages/details';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/create" component={Create} isPrivate />
      <Route path="/detalhes/:id" component={Detalhes} isPrivate />
    </Switch>
  );
}
