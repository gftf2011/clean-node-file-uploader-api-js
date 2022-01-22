const MissingParamError = require('../../utils/errors/missing-param-error');
const ServerError = require('../../utils/errors/server-error');

module.exports = class InsertFileRepository {
  constructor({ insertFileDAO } = {}) {
    this.insertFileDAO = insertFileDAO;
  }

  async insert({ name, path } = {}) {
    if (!name) {
      throw new MissingParamError('name');
    } else if (!path) {
      throw new MissingParamError('path');
    } else if (!this.insertFileDAO || !this.insertFileDAO.insertSingleFile) {
      throw new ServerError();
    }
    const file = await this.insertFileDAO.insertSingleFile([name, path]);
    return file;
  }
};
