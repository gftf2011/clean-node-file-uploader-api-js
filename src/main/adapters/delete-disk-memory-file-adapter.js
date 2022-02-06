const fs = require('fs');
const { resolve } = require('path');

const FileNotFoundError = require('../../utils/errors/file-not-found-error');

module.exports = class DeleteDiskMemoryFileAdapter {
  async delete(path) {
    if (fs.existsSync(resolve('..', '..', '..', 'temp', 'uploads', path))) {
      await fs.unlink(resolve('..', '..', '..', 'temp', 'uploads', path));
    } else {
      throw new FileNotFoundError(path);
    }
  }
};
