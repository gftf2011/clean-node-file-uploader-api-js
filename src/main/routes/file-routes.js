const FileRouterComposer = require('../composers/file-router-composer');

const ExpressRouterAdapter = require('../adapters/express-router-adapter');

const upload = require('../middlewares/upload');

module.exports = router => {
  const fileRouterComposer = new FileRouterComposer();
  const fileRouter = fileRouterComposer.compose();
  router.post('/file', upload, ExpressRouterAdapter.adapter(fileRouter));
};
