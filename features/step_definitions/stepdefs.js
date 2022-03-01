/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

/**
 * Support
 */
const { sendPngFile } = require('../support/api-support');

let endpointPath;
let response;

Given('I a have the endpoint {string}', endpoint => {
  endpointPath = endpoint;
});

When('I send the request with a valid png file', async () => {
  response = await sendPngFile(endpointPath);
});

Then('I should get {int} response', status => {
  assert.equal(status, response.status);
});
