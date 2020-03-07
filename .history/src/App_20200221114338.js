import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/About';
import Contact from './components/Contact';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
