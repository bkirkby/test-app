development for this software uses dynamodb for the data that make sense for
dynamodb (users, for example). for development it's easier to develop to a
a local dynamodb-local instance. this document lists several concepts/commands
that prove useful for dealing with dynamodb-local.

## setting up dynamodb-local
we use the dynamodb-local npm package to wrap DynamoDBLocal. dynamodb-local
is also useful for the automated tests. DynamoDBLocal requires a version of
java to be installed.

for now, open a console window to run the DynamoDBLocal software and issue
the following command:

1. `bin/startDynamoDBLocal.sh`

then you should be good to connect to the local dydnamodb.

## AWS CLI

the commandline AWS tool can be run against dynamodb local. you must setup
the AWS environment variables and then pass an endpoint into the aws cli
command:

1. export AWS_ACCESS_KEY_ID=fake
2. export AWS_SECRET_ACCESS_KEY=fake
3. export AWS_REGION=us-east-1
4. aws dynamodb list-tables --endpoint-url http://localhost:8000

## dynamodb-admin

there's an excellent website interface tool for managing databases with
DynamoDBLocal. here are the commands to install and use dynamodb-admin.

1. npm -g install dynamodb-admin
2. export DYNAMO_ENDPOINT=http://localhost:8000
3. dynamodb-admin -o

this will start a local webserver on localhost:8001 and start a browser
session with it.


