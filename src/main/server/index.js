const express = require('express');

const server = express();

const setup = require('../config/setup');

setup(server);

module.exports = server;
