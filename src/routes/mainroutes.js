import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthGate } from '../components/AuthGate/AuthGate';
import { AdminTable } from '../pages/AdminTable/AdminTable';
import { Auth } from '../pages/Auth/Auth';


export const Routes = () => {
    return (
        <BrowserRouter>
        <AuthGate>
          <Switch>
            <Route exact path="/adminPanel" component={AdminTable} />
            <Route exact path="/admin" component={Auth} />
          </Switch>
        </AuthGate>
      </BrowserRouter>
    );
};
