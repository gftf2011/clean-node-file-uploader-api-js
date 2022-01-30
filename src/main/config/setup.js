const jsonParser = require('../middlewares/json-parser');
const contentType = require('../middlewares/content-type');
const staticFile = require('../middlewares/static-file');
const cors = require('../middlewares/cors');

module.exports = app => {
  app.disable('x-powered-by');
  jsonParser(app);
  contentType(app);
  staticFile(app);
  cors(app);
};
