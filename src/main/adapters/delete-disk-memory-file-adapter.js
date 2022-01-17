const fs = require('fs');

const FileNotFoundError = require('../../utils/errors/file-not-found-error');

module.exports = class DeleteDiskMemoryFileAdapter {
  async delete(path) {
    if (fs.existsSync(path)) {
      await fs.unlink(path);
    } else {
      throw new FileNotFoundError(path);
    }
  }
};
