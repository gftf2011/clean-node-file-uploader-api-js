const FileEntityToFileModelMapper = require('../../../../src/infra/helpers/data-mapper/file-entity-to-file-model-mapper');

module.exports = class FileEntityToFileModelMapperFactory {
  create() {
    this.fileEntityToFileModelMapper = new FileEntityToFileModelMapper();
    return {
      fileEntityToFileModelMapper: this.fileEntityToFileModelMapper,
    };
  }
};
