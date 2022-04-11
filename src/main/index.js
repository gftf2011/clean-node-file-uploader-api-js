require('./bootstrap');

const cluster = require('cluster');
const os = require('os');
const server = require('./server');

const loader = require('./loader');
const routes = require('./config/routes');

if (cluster.isPrimary && !+process.env.ENABLE_BENCHMARK) {
  os.cpus().forEach(() => cluster.fork());
} else {
  loader()
    .then(() => {
      routes(server);
      server.listen(parseInt(process.env.APPLICATION_PORT, 10), () => {
        console.log('Server Running');
      });
    })
    .catch(error => {
      console.error(error);
    });
}
