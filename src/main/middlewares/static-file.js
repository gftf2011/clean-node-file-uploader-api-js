const express = require('express');
const path = require('path');

module.exports = app => {
  app.use(
    '/file',
    express.static(
      path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'),
    ),
  );
};
