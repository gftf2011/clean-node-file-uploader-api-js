const InsertFileDAOSpyFactory = require('./spies/insert-file-dao-spy-factory');
const FileEntityToFileModelMapperSpyFactory = require('./spies/file-entity-to-file-model-mapper-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.insertFileDAOSpy = new InsertFileDAOSpyFactory().create();
    this.fileEntityToFileModelMapperSpy =
      new FileEntityToFileModelMapperSpyFactory().create();
    return {
      insertFileDAOSpy: this.insertFileDAOSpy,
      fileEntityToFileModelMapperSpy: this.fileEntityToFileModelMapperSpy,
    };
  }
};
