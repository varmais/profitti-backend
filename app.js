import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import { Model } from 'objection';
import Knex from 'knex';
import pg from 'pg';
import passport from 'passport';

import routes from './routes';
import renderError from './helpers/renderError';
import setupPassport from './helpers/passport';

pg.defaults.ssl = true;
const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
Model.knex(knex);

let app = express();
setupPassport(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(renderError);

module.exports = app;