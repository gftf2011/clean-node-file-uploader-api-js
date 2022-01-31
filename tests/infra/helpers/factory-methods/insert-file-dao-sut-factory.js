const InsertFileDAO = require('../../../../src/infra/helpers/dao/insert-file-dao');

const DependenciesFactory = require('../factories/insert-file-dao-dependencies-factory');

const {
  INSERT_FILE_DAO_WITH_NO_DEPENDENCY,
  INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_DAO_WITH_NO_FILE_ENTITY_TO_FILE_MODEL_MAPPER_AS_DEPENDENCY,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_GET_CLIENT_CONNECTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_SINGLE_TRANSACTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_CLIENT_DISCONNECT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_COMMIT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_ROLLBACK,
  INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR) {
      this.dependencies.databaseDriverTemplateMethodsSpy.singleTransaction =
        async (_client, _statement, _values) => {
          return Promise.reject(new Error());
        };
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
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
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_GET_CLIENT_CONNECTION
    ) {
      this.dependencies.databaseDriverTemplateMethodsSpy.getClientConnect =
        undefined;
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_SINGLE_TRANSACTION
    ) {
      this.dependencies.databaseDriverTemplateMethodsSpy.singleTransaction =
        undefined;
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_CLIENT_DISCONNECT
    ) {
      this.dependencies.databaseDriverTemplateMethodsSpy.clientDisconnect =
        undefined;
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_COMMIT
    ) {
      this.dependencies.databaseDriverTemplateMethodsSpy.commit = undefined;
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else if (
      type ===
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_ROLLBACK
    ) {
      this.dependencies.databaseDriverTemplateMethodsSpy.rollback = undefined;
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
        fileEntityToFileModelMapper:
          this.dependencies.fileEntityToFileModelMapperSpy,
      });
    } else {
      this.sut = new InsertFileDAO({
        databaseDriverTemplateMethods:
          this.dependencies.databaseDriverTemplateMethodsSpy,
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
