const FileEntityToFileModelMapper = require('../../../../src/infra/helpers/data-mapper/file-entity-to-file-model-mapper');

module.exports = class SutFactory {
  create() {
    this.sut = new FileEntityToFileModelMapper();
    return {
      sut: this.sut,
    };
  }
};
