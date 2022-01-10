const FileRecordUseCaseSpy = require('../../../../../spies/file-record-use-case-spy');

module.exports = class FileRecordUseCaseSpyFactory {
  create() {
    this.fileRecordUseCaseSpy = new FileRecordUseCaseSpy();
    return this.fileRecordUseCaseSpy;
  }
};
