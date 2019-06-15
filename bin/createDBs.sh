#!/usr/bin/env node -require esm

process.env.DEBUG="createDBs.sh";

import dotenv from 'dotenv';
dotenv.config();
import DynamoDB from 'aws-sdk/clients/dynamodb';

const debug = require('debug')(process.env.DEBUG);
const ddb = new DynamoDB({region: 'us-east-1', endpoint: process.env.DDB_URL});

if (!process.env.APP_NAME) {
  debug(".env file needs configured (APP_NAME)");
  process.exit(1);
}

const APP_NAME = process.env.APP_NAME;

const TABLES = [
  {
    AttributeDefinitions: [ 
      {
        AttributeName: 'email',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'email',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: APP_NAME+'-users'
  }
];

ddb.createTable(TABLES[0], (err, data) => {
  if (err) {
    debug('error creating tables ', err);
    return 1;
  }
  debug('create table: ', data);
});
