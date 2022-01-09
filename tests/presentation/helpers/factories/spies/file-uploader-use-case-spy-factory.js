const FileUploaderUseCaseSpy = require('../../../../../spies/file-uploader-use-case-spy');

module.exports = class FileUploaderUseCaseSpyFactory {
  create() {
    this.fileUploaderUseCaseSpy = new FileUploaderUseCaseSpy();
    return this.fileUploaderUseCaseSpy;
  }
};
