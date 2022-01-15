const FileRecordUseCase = require('../../../../src/domain/use-cases/file-record-use-case');

module.exports = class SutFactory {
  create(_type) {
    this.sut = new FileRecordUseCase({});

    return {
      sut: this.sut,
    };
  }
};
