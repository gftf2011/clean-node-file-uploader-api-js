const FileEntityToFileModelMapperSpy = require('../../../../../spies/file-entity-to-file-model-mapper-spy');

module.exports = class FileEntityToFileModelMapperSpyFactory {
  create() {
    this.fileEntityToFileModelMapperSpy = new FileEntityToFileModelMapperSpy();
    return this.fileEntityToFileModelMapperSpy;
  }
};
