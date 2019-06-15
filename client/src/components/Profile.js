import React from 'react'
import { Button } from 'reactstrap'

class Profile extends React.Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.logout(this.props.history)
  }
  render() {
    return (
      <div>
        <h2>{this.props.email}</h2>
        <Button onClick={this.handleLogout}>logout</Button>
      </div>
    )
  }
}

export default Profile
