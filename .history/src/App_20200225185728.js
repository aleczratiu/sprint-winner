import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { withFirebase } from './firebase/index';
import './App.css';

function App() {
    useEffect(() => {
        firebase.auth.onAuthStateChanged(
            (authUser) => {
                if (!condition(authUser)) {
                    this.props.history.push(ROUTES.SIGN_IN);
                }
            },
        );
    });
    return (
      <BrowserRouter>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default withFirebase(App);
