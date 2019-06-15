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
        <h3>email: {this.props.user.email}</h3>
        <Button onClick={this.handleLogout}>logout</Button>
      </div>
    )
  }
}

export default Profile
