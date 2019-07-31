import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './authentication/PrivateRoute';
import SignUp from './authentication/SignUp';
import Login from './authentication/Login';
import Home from './Home'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path='/signup' render={(props) => <SignUp {...props} />} />
        <Route path='/login' render={(props) => <Login {...props} />} />
        <PrivateRoute path='/' component={Home} />   
      </Switch>
    </div>
  );
}

export default App;
