/**
 * Presentation
 */
const FileRouter = require('../../presentation/routers/file-router');

/**
 * Domain
 */
const FileRecordUseCase = require('../../domain/use-cases/file-record-use-case');
const FileDeleteUseCase = require('../../domain/use-cases/file-delete-use-case');

/**
 * Adapters
 */
const FileDeleteAdapter = require('../adapters/delete-disk-memory-file-adapter');

/**
 * Infra
 */
const InsertFileRepository = require('../../infra/repositories/insert-file-repository');

/**
 * DAO
 */
const InsertFileDAO = require('../../infra/helpers/dao/insert-file-dao');

/**
 * DB
 */
const DatabaseDriverTemplateMethods = require('../../infra/helpers/template-methods/postgresql-driver-template-methods');

module.exports = class FileRouterComposer {
  compose() {
    const fileDeleteAdapter = new FileDeleteAdapter();

    const databaseDriverTemplateMethods = DatabaseDriverTemplateMethods;

    const insertFileDAO = new InsertFileDAO({ databaseDriverTemplateMethods });

    const insertFileRepository = new InsertFileRepository({ insertFileDAO });

    const fileRecordUseCase = new FileRecordUseCase({ insertFileRepository });
    const fileDeleteUseCase = new FileDeleteUseCase({ fileDeleteAdapter });

    const fileRouter = new FileRouter({
      fileRecordUseCase,
      fileDeleteUseCase,
    });

    return fileRouter;
  }
};
