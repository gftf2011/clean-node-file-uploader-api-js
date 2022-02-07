const DeleteDiskMemoryFileAdapter = require('../../../../../src/main/adapters/delete-disk-memory-file-adapter');

module.exports = class SutFactory {
  create() {
    this.sut = new DeleteDiskMemoryFileAdapter();

    return {
      sut: this.sut,
    };
  }
};
