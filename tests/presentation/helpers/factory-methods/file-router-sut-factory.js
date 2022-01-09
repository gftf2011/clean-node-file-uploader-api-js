const FileRouter = require('../../../../src/presentation/routers/file-router');

module.exports = class SutFactory {
    create(_type) {
      this.sut = new FileRouter();
      return {
        sut: this.sut
      };
    }
  };