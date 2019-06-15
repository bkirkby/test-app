import React from 'react'

import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'

class UserList extends React.Component {
  state = {
    users: []
  }
  componentDidMount() {
    console.log('bk: UserList: componentDidMount')

    const client = new ApolloClient({
      uri: `${process.env.REACT_APP_API_URL}/graphql`
    })

    const query = gql`
      {
        users(first: 0, after: "")
      }
    `

    client
      .query({ query: query })
      .then(res => this.setState({ users: res.data.users }))
      .catch(err => console.error(err))
  }

  render() {
    return this.state.users.map(user => <p>user.email</p>)
  }
}

export default UserList
