const InsertFileDAO = require('../../../../src/infra/helpers/dao/insert-file-dao');

const DependenciesFactory = require('../factories/insert-file-dao-dependencies-factory');

const {
  INSERT_FILE_DAO_WITH_NO_DEPENDENCY,
  INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_DAO_WITH_NO_FILE_ENTITY_TO_FILE_MODEL_MAPPER_AS_DEPENDENCY,
  INSERT_FILE_DAO_WITH_HAS_FILE_ENTITY_TO_FILE_MODEL_MAPPER_WITH_NO_MAP,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_GET_CLIENT_CONNECTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_SINGLE_TRANSACTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_CLIENT_DISCONNECT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_COMMIT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_ROLLBACK,
  INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR) {
      this.dependencies.databaseDriverSpy.singleTransaction = async (
        _client,
        _statement,
        _values,
      ) => {
        return Promise.reject(new Error());
      };
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (type === INSERT_FILE_DAO_WITH_NO_DEPENDENCY) {
      this.sut = new InsertFileDAO();
    } else if (type === INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY) {
      this.sut = new InsertFileDAO({});
    } else if (
      type ===
      INSERT_FILE_DAO_WITH_NO_FILE_ENTITY_TO_FILE_MODEL_MAPPER_AS_DEPENDENCY
    ) {
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_WITH_HAS_FILE_ENTITY_TO_FILE_MODEL_MAPPER_WITH_NO_MAP
    ) {
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper: {},
      });
    } else if (
      type === INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_GET_CLIENT_CONNECTION
    ) {
      this.dependencies.databaseDriverSpy.getClientConnect = undefined;
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type === INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_SINGLE_TRANSACTION
    ) {
      this.dependencies.databaseDriverSpy.singleTransaction = undefined;
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type === INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_CLIENT_DISCONNECT
    ) {
      this.dependencies.databaseDriverSpy.clientDisconnect = undefined;
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (type === INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_COMMIT) {
      this.dependencies.databaseDriverSpy.commit = undefined;
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (type === INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_ROLLBACK) {
      this.dependencies.databaseDriverSpy.rollback = undefined;
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else {
      this.sut = new InsertFileDAO({
        databaseDriver: this.dependencies.databaseDriverSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    }

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
