const express = require('express');

const app = express();

const { requestLogger } = require('./middleware.js');

app.use(requestLogger);

app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;