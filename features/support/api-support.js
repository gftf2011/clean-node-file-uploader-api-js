/* eslint-disable import/no-extraneous-dependencies */
require('../../src/main/bootstrap');

const axios = require('axios').default;
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const instance = axios.create({
  baseURL: `http://localhost:${process.env.APPLICATION_PORT}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const sendPngFile = async url => {
  const data = new FormData();
  data.append(
    'file',
    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'public', 'test', 'test-image.png'),
    ),
  );

  const response = await instance.post(url, data, {
    headers: data.getHeaders(),
  });

  return response;
};

const sendJpegFile = async url => {
  const data = new FormData();
  data.append(
    'file',
    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'public', 'test', 'test-image.jpeg'),
    ),
  );

  const response = await instance.post(url, data, {
    headers: data.getHeaders(),
  });

  return response;
};

const sendJpgFile = async url => {
  const data = new FormData();
  data.append(
    'file',
    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'public', 'test', 'test-image.jpg'),
    ),
  );

  const response = await instance.post(url, data, {
    headers: data.getHeaders(),
  });

  return response;
};

const sendGifFile = async url => {
  const data = new FormData();
  data.append(
    'file',
    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'public', 'test', 'test-image.gif'),
    ),
  );

  const response = await instance.post(url, data, {
    headers: data.getHeaders(),
  });

  return response;
};

const sendInvalidFile = async url => {
  const data = new FormData();
  data.append(
    'file',
    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'public', 'test', 'test-file.json'),
    ),
  );

  let response;

  try {
    response = await instance.post(url, data, {
      headers: data.getHeaders(),
    });
  } catch (err) {
    response = err.response;
  }

  return response;
};

module.exports = {
  sendPngFile,
  sendJpegFile,
  sendJpgFile,
  sendGifFile,
  sendInvalidFile,
};
