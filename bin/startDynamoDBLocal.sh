#!/usr/bin/env node
process.env.DEBUG="dynamodb-local"

const DynamoDbLocal = require('dynamodb-local');
const os = require('os');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const debug = require('debug')(process.env.DEBUG);

dotenv.config();

const DDB_URL = process.env.DDB_URL;

if (!DDB_URL) {
  debug('DDB_URL not configed in .env');
  return 1;
}

const dynamoLocalPort = DDB_URL.substring(DDB_URL.lastIndexOf(':')+1);
const dbLocation = path.join(os.tmpdir(), 'dynamodb-local-db')

if (!fs.existsSync(dbLocation)){
  fs.mkdirSync(dbLocation);
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  process.env.AWS_ACCESS_KEY_ID="fake";
  process.env.AWS_SECRET_ACCESS_KEY="fake";
}

async function ddbStart() {
  const child = await DynamoDbLocal.launch(dynamoLocalPort, dbLocation, [], true, true); // must be wrapped in async function
}
ddbStart()

