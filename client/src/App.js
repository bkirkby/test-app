import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import UserList from './components/UserList';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <h1>test app</h1>
          <div>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
          </div>
        </nav>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={UserList}/>
      </div>
    </Router>
  );
}

export default App;
