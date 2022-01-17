const FileDeleteAdapterSpy = require('../../../../../spies/file-delete-adapter-spy');

module.exports = class InsertFileRepositorySpyFactory {
  create() {
    this.fileDeleteAdapterSpy = new FileDeleteAdapterSpy();
    return this.fileDeleteAdapterSpy;
  }
};
