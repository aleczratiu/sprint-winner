import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { withAuthentication } from './session/index';
import SignIn from './components/Auth/SignIn';
import './App.css';

function App() {
    return (
      <BrowserRouter>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path={} component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
}

export default withAuthentication(App);
