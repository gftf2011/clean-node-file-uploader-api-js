const FileRecordUseCaseSpyFactory = require('./spies/file-record-use-case-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.fileRecordUseCaseSpy = new FileRecordUseCaseSpyFactory().create();
    return {
      fileRecordUseCaseSpy: this.fileRecordUseCaseSpy,
    };
  }
};
