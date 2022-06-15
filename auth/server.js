'use strict';

const express = require('express');
const app = express();

const authRouter = require("./routes/index.routes.js");

const notFoundError = require('./error-handlers/404');
const internalError = require('./error-handlers/500');

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(express.json());
app.use(authRouter);

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