const FileDeleteAdapterSpyFactory = require('./spies/file-delete-adapter-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.fileDeleteAdapterSpy = new FileDeleteAdapterSpyFactory().create();
    return {
      fileDeleteAdapterSpy: this.fileDeleteAdapterSpy,
    };
  }
};
