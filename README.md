# App Template

this is a template for creating a node/express/graphql application
with a react client frontend. the template has standard user
interactions like registration, login, and user administration
using a dynamodb as the backend.

## downloads

1. make sure java is installed

## configure

secrets configuration is kept in a .env file with the following
variables. the .env file should not be committed to the repo.

the parameters needed in the .env file are as follows:
```
APP_NAME=app-name
JWT_SECRET=the super secret jwt secret for bcrypt
DDB_URL=http://localhost:8000
AWS_ACCESS_KEY_ID=fake
AWS_SECRET_ACCESS_KEY=fake
AWS_REGION=us-east-1
```

the DDB_URL should be set to hit a testing/dev version of ddb.
if you are deploying to a production aws ddb, then omit this
value from the .env file.

## dev setup

```
git clone https://github.com/bkirkby/test-app.git
cd test-app
vi .env # put the env variables above in this file
yarn install
cd client yarn install
cd ..
# start three separate console and do the next three commands
# in them separately
bin/startDyanmoDBLocal.sh
yarn start
cd client && yarn start
```

at this point you should have three separate consoles running
the node/express backend in one, the react front in in another
(from the client directory), and a dynamodblocal server in the
third.

i use vscode from here on out to access the test-app directory.

