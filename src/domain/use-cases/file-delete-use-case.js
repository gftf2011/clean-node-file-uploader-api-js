const MissingParamError = require('../../utils/errors/missing-param-error');
const ServerError = require('../../utils/errors/server-error');

module.exports = class FileDeleteUseCase {
  constructor({ fileDeleteAdapter } = {}) {
    this.fileDeleteAdapter = fileDeleteAdapter;
  }

  async execute({ path } = {}) {
    if (!this.fileDeleteAdapter || !this.fileDeleteAdapter.delete) {
      throw new ServerError();
    } else if (!path) {
      throw new MissingParamError('path');
    }
    await this.fileDeleteAdapter.delete(path);
  }
};
