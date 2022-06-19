'use strict';

const express = require('express');
const app = express();

const notFoundError = require('./error-handlers/404');
const internalError = require('./error-handlers/500');

const signinRouters = require("./routes/signin");
const signupRouters = require("./routes/signup");
const secretStuffRouters = require("./routes/secretstuff");
const getUsersRouters = require("./routes/getUsers");

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(signinRouters);
app.use(signupRouters);
app.use(secretStuffRouters);
app.use(getUsersRouters);

app.use('*', notFoundError);
app.use(internalError);



const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`Server is running on the PORT ${PORT}`);
    });
};


module.exports = {
    app: app,
    start: start,
};