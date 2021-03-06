const ServerError = require('../../../../src/utils/errors/server-error');
const MissingParamError = require('../../../../src/utils/errors/missing-param-error');
const FileNotFoundError = require('../../../../src/utils/errors/file-not-found-error');

const FileRouter = require('../../../../src/presentation/routers/file-router');

const DependenciesFactory = require('../factories/file-router-dependencies-factory');

const {
  FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR,
  FILE_ROUTER_SUT_FILE_DELETE_USE_CASE_THROWING_ERROR,
  FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_MISSING_PARAM_ERROR,
  FILE_ROUTER_SUT_FILE_DELETE_USE_CASE_THROWING_FILE_NOT_FOUND_ERROR,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR) {
      this.dependencies.fileRecordUseCaseSpy.execute = ({ _name, _path }) => {
        return Promise.reject(new ServerError());
      };
    } else if (type === FILE_ROUTER_SUT_FILE_DELETE_USE_CASE_THROWING_ERROR) {
      this.dependencies.fileDeleteUseCaseSpy.execute = ({ _path }) => {
        return Promise.reject(new ServerError());
      };
    } else if (
      type === FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_MISSING_PARAM_ERROR
    ) {
      this.dependencies.fileRecordUseCaseSpy.execute = ({ _path }) => {
        return Promise.reject(new MissingParamError('name'));
      };
    } else if (
      type ===
      FILE_ROUTER_SUT_FILE_DELETE_USE_CASE_THROWING_FILE_NOT_FOUND_ERROR
    ) {
      this.dependencies.fileDeleteUseCaseSpy.execute = ({ path }) => {
        return Promise.reject(new FileNotFoundError(path));
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
