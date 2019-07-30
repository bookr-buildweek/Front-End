import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home'
import PrivateRoute from './authentication/PrivateRoute';
import SignUp from './authentication/SignUp';
import Login from './authentication/Login';
import {Switch } from 'react-router-dom'
import './index.css';

function App() {

  return (
    <div className="App">
        <Route  path='/login' render={(props) => <Login {...props} />} />
        <Route  path='/signup' render={(props) => <SignUp {...props} />} />
        <PrivateRoute path='/' component={Home} />   
    </div>
  );
}

export default App;
