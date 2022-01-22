const ServerError = require('../../utils/errors/server-error');
const MissingParamError = require('../../utils/errors/missing-param-error');

module.exports = class FileRecordUseCase {
  constructor({ insertFileRepository } = {}) {
    this.insertFileRepository = insertFileRepository;
  }

  async execute({ name, path } = {}) {
    if (!this.insertFileRepository || !this.insertFileRepository.insert) {
      throw new ServerError();
    } else if (!name) {
      throw new MissingParamError('name');
    } else if (!path) {
      throw new MissingParamError('path');
    }
    try {
      const response = await this.insertFileRepository.insert({ name, path });
      return {
        originalname: response.name,
        filename: response.path,
      };
    } catch (_error) {
      return null;
    }
  }
};
