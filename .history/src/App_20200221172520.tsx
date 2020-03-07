import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    return (
      <BrowserRouter>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
