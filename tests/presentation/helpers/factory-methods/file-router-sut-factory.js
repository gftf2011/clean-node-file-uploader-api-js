const ServerError = require('../../../../src/utils/errors/server-error');

const FileRouter = require('../../../../src/presentation/routers/file-router');

const DependenciesFactory = require('../factories/file-router-dependencies-factory');

const {
  FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR) {
      this.dependencies.fileRecordUseCaseSpy.execute = ({ _name, _path }) => {
        return Promise.reject(new ServerError());
      };
    }

    this.sut = new FileRouter({
      fileRecordUseCase: this.dependencies.fileRecordUseCaseSpy,
      fileDeleteUseCase: this.dependencies.fileDeleteUseCaseSpy,
    });

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
