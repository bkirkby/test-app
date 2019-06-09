import express from 'express';
import graphqlHTTP from 'express-graphql';
import logger from 'morgan';
import { UserSchema, UserRoot } from './graphql/UserSchema';
import passport from 'passport';
import passportConfig from './passport-config';
import usersRouter from './routes/users';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

passportConfig(passport);

app.use('/users', usersRouter);

app.use('/graphql', graphqlHTTP({
  schema: UserSchema,
  rootValue: UserRoot,
  graphiql: true,
}));

app.get('/secret', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({message: "success! you cannot see this without a token!"})
});

app.listen(4000);
console.log('running a graphql api server at localhost:4000/graphql');
