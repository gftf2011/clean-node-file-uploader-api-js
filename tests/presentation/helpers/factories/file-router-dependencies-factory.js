const FileUploaderUseCaseSpyFactory = require('./spies/file-uploader-use-case-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.fileUploaderUseCaseSpy = new FileUploaderUseCaseSpyFactory().create();
    return {
      fileUploaderUseCaseSpy: this.fileUploaderUseCaseSpy,
    };
  }
};
