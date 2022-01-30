const multer = require('multer');

const crypto = require('crypto');
const path = require('path');

const InvalidFileTypeError = require('../../utils/errors/invalid-file-type-error');

const parameters = {
  development: {
    dest: path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'),
    fileSize: 2 * 1024 * 1024,
  },
};

const config = {
  dest: parameters.development.dest,
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, parameters.development.dest);
    },
    filename: (_req, file, cb) => {
      crypto.randomBytes(16, (_err, res) => {
        return cb(null, res.toString('hex') + path.extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: parameters.development.fileSize,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new InvalidFileTypeError());
    }
  },
};

module.exports = config;
