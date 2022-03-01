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
} = require('../support/api-support');

let endpointPath;
let response;

// eslint-disable-next-line consistent-return
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
};

Given('I a have the endpoint {string}', endpoint => {
  endpointPath = endpoint;
});

When('I send the request with a valid {string} file', async fileType => {
  response = await apiFactoryResponse(fileType);
});

Then('I should get {int} response', status => {
  assert.equal(status, response.status);
});
