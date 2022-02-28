const multer = require('multer');

const configMulter = require('../config/multer');

const upload = multer(configMulter).single('file');

const InvalidFileTypeError = require('../../utils/errors/invalid-file-type-error');

module.exports = class MulterSingleMiddlewareAdapter {
  static adapter(req, res, next) {
    // eslint-disable-next-line consistent-return
    return upload(req, res, err => {
      if (err) {
        if (err instanceof InvalidFileTypeError) {
          return res.status(500).json(err);
        }
      }
      next();
    });
  }
};
