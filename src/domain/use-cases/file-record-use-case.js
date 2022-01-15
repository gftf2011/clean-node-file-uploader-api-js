const MissingParamError = require('../../utils/errors/missing-param-error');

module.exports = class FileRecordUseCase {
  constructor({ insertFileRepository } = {}) {
    this.insertFileRepository = insertFileRepository;
  }

  async execute({ name, path }) {
    if (!name) {
      throw new MissingParamError('name');
    } else if (!path) {
      throw new MissingParamError('path');
    }
    try {
      await this.insertFileRepository.insert({ name, path });
      return {
        originalname: name,
        filename: path,
      };
    } catch (_error) {
      return null;
    }
  }
};
