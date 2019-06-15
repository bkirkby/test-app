import React from 'react'
import { Form, Label, FormGroup, Input, Button, FormText } from 'reactstrap'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class LoginForm extends React.Component {
  state = {
    isLogin: true,
    user: { email: '', password: '' },
    error: ''
  }

  toggleLogin = e => {
    e.preventDefault()
    this.setState({ isLogin: !this.state.isLogin })
  }

  getEmailFromToken = token => {
    const { email } = jwt_decode(token)
    return email
  }

  handleSubmit = e => {
    e.preventDefault()
    const endpoint = this.state.isLogin ? 'login' : 'register'
    axios
      .post(`${process.env.REACT_APP_API_URL}/${endpoint}`, this.state.user)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        this.props.setUserEmail(this.getEmailFromToken(res.data.token))
        this.props.history.push('/profile')
      })
      .catch(err => {
        console.error(`${endpoint} failed: `, err)
        this.setState({
          ...this.state,
          error: `unable to login`
        })
      })
  }

  handleTextChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="email">email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="user@domain.com"
            onChange={this.handleTextChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">password</Label>
          <Input
            onChange={this.handleTextChange}
            type="password"
            name="password"
            id="password"
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>
          {this.state.isLogin ? 'login' : 'register'}
        </Button>
        <FormText onClick={this.toggleLogin}>
          {this.state.isLogin
            ? 'not a user? click here to register'
            : 'already a user? click here to login'}
        </FormText>
        {this.state.error && (
          <FormText color="danger">*{this.state.error}</FormText>
        )}
      </Form>
    )
  }
}

export default LoginForm
