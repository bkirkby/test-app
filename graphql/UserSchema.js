import { buildSchema } from 'graphql';
import User from '../models/user';

export const UserSchema = buildSchema(`
  type Query {
    user(email: String, id: Int): User
    users(first: Int!, after: String!): [User]
  },
  type User {
    id: Int
    email: String
  },
`);

export const UserRoot = {
  user: ({email, id}) => {
    if (email) {
      return User.findByEmail(email);
    } else if (id) {
      return User.findById(id);
    }
  },
  users: ({first, after}) => {
    // first - the max number of items to return
    // after - the last key returned from this call
    return User.allUsers();
  }
};

