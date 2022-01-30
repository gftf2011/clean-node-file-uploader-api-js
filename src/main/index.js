require('./bootstrap');

const server = require('./server');

const loader = require('./loader');
const routes = require('./config/routes');

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
