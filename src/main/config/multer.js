const multer = require('multer');

const crypto = require('crypto');
const path = require('path');

const InvalidFileTypeError = require('../../utils/errors/invalid-file-type-error');

const parameters = {
  development: {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    fileSize: 2 * 1024 * 1024,
  },
};

const config = {
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, parameters[process.env.NODE_ENV].dest);
    },
    filename: (_req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) {
          return cb(err, '');
        }
        return cb(null, res.toString('hex') + path.extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: parameters[process.env.NODE_ENV].fileSize,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new InvalidFileTypeError());
    }
  },
};

module.exports = config;
