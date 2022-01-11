const FileDeleteUseCaseSpy = require('../../../../../spies/file-delete-use-case-spy');

module.exports = class FileDeleteUseCaseSpyFactory {
  create() {
    this.fileDeleteUseCaseSpy = new FileDeleteUseCaseSpy();
    return this.fileDeleteUseCaseSpy;
  }
};
