const FileRecordUseCaseSpyFactory = require('./spies/file-record-use-case-spy-factory');
const FileDeleteUseCaseSpyFactory = require('./spies/file-delete-use-case-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.fileRecordUseCaseSpy = new FileRecordUseCaseSpyFactory().create();
    this.fileDeleteUseCaseSpy = new FileDeleteUseCaseSpyFactory().create();
    return {
      fileRecordUseCaseSpy: this.fileRecordUseCaseSpy,
      fileDeleteUseCaseSpy: this.fileDeleteUseCaseSpy,
    };
  }
};
