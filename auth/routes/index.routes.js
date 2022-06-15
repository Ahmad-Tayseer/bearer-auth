'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const {
    handleSignup,
    handleSignin,
    handleGetUsers,
    handleSecret
} = require('./handlers.routes');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;