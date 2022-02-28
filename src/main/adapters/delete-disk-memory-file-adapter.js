const fs = require('fs');
const { resolve } = require('path');

const FileNotFoundError = require('../../utils/errors/file-not-found-error');

module.exports = class DeleteDiskMemoryFileAdapter {
  async delete(path) {
    if (
      fs.existsSync(
        resolve(__dirname, '..', '..', '..', 'temp', 'uploads', path),
      )
    ) {
      fs.unlinkSync(
        resolve(__dirname, '..', '..', '..', 'temp', 'uploads', path),
      );
    } else {
      throw new FileNotFoundError(path);
    }
  }
};
