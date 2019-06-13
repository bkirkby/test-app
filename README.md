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

the paramters needed in the .env file are as follows:
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

