import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import NewGame from './pages/NewGame';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (routeProps) => {
          const isLogged = localStorage.getItem('trivia-user') !== null;
          return isLogged ? <Redirect to="/newgame" /> : <Login { ...routeProps } />;
        } }
      />
      <Route path="/newgame" component={ NewGame } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
