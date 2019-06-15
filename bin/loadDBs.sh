#!/usr/bin/env node -r esm

process.env.DEBUG="loadDBs.sh";

import dotenv from 'dotenv';
dotenv.config();
import DynamoDB from 'aws-sdk/clients/dynamodb';
import bcrypt from 'bcrypt';

const debug = require('debug')(process.env.DEBUG);
const ddb = new DynamoDB({region: 'us-east-1', endpoint: process.env.DDB_URL});

if (!process.env.APP_NAME) {
  debug(".env file needs configured (APP_NAME)");
  return 1;
}

const USERS = [
  {
    email: 'homer@simpsons.fam',
    password: 'password'
  }
];
