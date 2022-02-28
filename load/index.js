// eslint-disable-next-line import/no-extraneous-dependencies
const autocannon = require('autocannon');
const path = require('path');

const instance = autocannon({
  title: 'Load Test for /file route',
  url: 'http://localhost:3333/api/file',
  connections: 20, // default
  duration: 40, // default
  workers: 1,
  method: 'POST',
  form: {
    file: {
      type: 'file',
      path: path.resolve(__dirname, '..', 'public', 'test', 'test-image.png'),
    },
  },
});

autocannon.track(instance, { renderProgressBar: true });
