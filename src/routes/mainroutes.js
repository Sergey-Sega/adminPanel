import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { AuthGate } from '../components/AuthGate/AuthGate';
import { AdminTable } from '../pages/AdminTable/AdminTable';
import { Auth } from '../pages/Auth/Auth';


export const Routes = () => {
    return (
        <HashRouter>
        <AuthGate>
          <Switch>
            <Route exact path="/" component={AdminTable} />
            <Route exact path="/adminPanel" component={Auth} />
          </Switch>
        </AuthGate>
      </HashRouter>
    );
};
