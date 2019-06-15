import React from 'react'
import {
  Navbar,
  NavItem,
  Collapse,
  Nav,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import UserList from './components/UserList'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'

import './App.css'

class App extends React.Component {
  state = {
    appName: process.env.REACT_APP_TITLE,
    showNavbar: true,
    user: {}
  }

  handleNavbarHide = () => {
    this.setState({
      showNavbar: !this.state.showNavbar
    })
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const { exp, email, role } = jwt_decode(token)
    const currTime = Math.round(new Date().getTime() / 1000)
    if (exp <= currTime) {
      this.setUser({})
    } else {
      this.setUser({ email, role })
    }
  }

  setUser = user => {
    this.setState({ ...this.state, user: user })
  }

  logout = history => {
    localStorage.removeItem('token')
    this.setUser({})
    history.push('/login')
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar
            className="navbar-inverse bg-inverse"
            color="light"
            light
            expand="md"
          >
            <NavbarBrand href="/">{this.state.appName}</NavbarBrand>
            <NavbarToggler onClick={this.handlNavbarHide} className="mr-2" />
            <Collapse isOpen={true} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink exact className="nav-link" to="/">
                    Home
                  </NavLink>
                </NavItem>
                {this.state.user.role === 'admin' && (
                  <NavItem>
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  {this.state.user && this.state.user.email ? (
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  ) : (
                    <NavLink exact className="nav-link" to="/login">
                      Login
                    </NavLink>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div className="App">
            <nav />
            <Route exact path="/" component={Home} />
            <Route path="/users" component={UserList} />
            <Route
              path="/login"
              render={props => (
                <LoginForm
                  {...props}
                  user={this.state.user}
                  setUser={this.setUser}
                />
              )}
            />
            <Route
              path="/profile"
              render={props => (
                <Profile
                  {...props}
                  user={this.state.user}
                  logout={this.logout}
                />
              )}
            />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
