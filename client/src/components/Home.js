import React from 'react'

export default () => {
  return (
    <div>
      <div>
        This is the home page of your application. The main landing and
        information page. This template uses{' '}
        <a href="https://reactstrap.github.io/">reactstrap</a> for it's styling.
        There's a Navbar at the top with an application title and some User
        specific menu items to navigate to.
      </div>
      <p />
      <div>
        <h3>configure</h3>
        After you clone this repo, you should perform the following steps:
        <ul>
          <li>
            rename the cloned directory to something that reflects your app:{' '}
            <b>mv test-app my-app</b>
          </li>
          <li>
            change into that directory and remove the .git files:{' '}
            <b>cd my-app &amp;&amp; rm -rf .git</b>
          </li>
          <li>
            modify the .env files in the root and client/ directories:{' '}
            <b>vi -o .env client/.env</b>
          </li>
          <li>
            initialize a new git repo: <b>git init</b>
          </li>
          <li>
            start the DynamoDBLocal: <b>bin/startDynamoDBLocal.sh</b>
          </li>
          <li>
            create the dynamo table: <b>bin/createDBs.sh</b>
          </li>
          <li>
            start the api server: <b>yarn start</b>
          </li>
          <li>
            start the client node server: <b>cd client &amp;&amp; yarn start</b>
          </li>
        </ul>
      </div>
    </div>
  )
}
