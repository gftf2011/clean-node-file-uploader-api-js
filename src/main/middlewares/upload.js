const multer = require('multer');

const configMulter = require('../config/multer');

const upload = multer(configMulter);

module.exports = upload;
