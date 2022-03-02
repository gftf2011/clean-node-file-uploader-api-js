/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

/**
 * Support
 */
const {
  sendPngFile,
  sendJpegFile,
  sendJpgFile,
  sendGifFile,
  sendInvalidFile,
} = require('../support/api-support');

let endpointPath;
let response;

const apiFactoryResponse = async type => {
  if (type === 'png') {
    return sendPngFile(endpointPath);
  }
  if (type === 'jpeg') {
    return sendJpegFile(endpointPath);
  }
  if (type === 'jpg') {
    return sendJpgFile(endpointPath);
  }
  if (type === 'gif') {
    return sendGifFile(endpointPath);
  }
  return sendInvalidFile(endpointPath);
};

Given('I a have the endpoint {string}', endpoint => {
  endpointPath = endpoint;
});

When('I send the request of a {string} file', async fileType => {
  response = await apiFactoryResponse(fileType);
});

Then('I should get {int} response', status => {
  assert.equal(status, response.status);
});
