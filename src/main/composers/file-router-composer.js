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
const DatabaseDriver = require('../../infra/helpers/postgresql-driver');

/**
 * Mappers
 */
const FileEntityToFileModelMapper = require('../../infra/helpers/data-mapper/file-entity-to-file-model-mapper');

module.exports = class FileRouterComposer {
  compose() {
    const fileDeleteAdapter = new FileDeleteAdapter();

    const databaseDriver = DatabaseDriver;

    const fileEntityToFileModelMapper = new FileEntityToFileModelMapper();

    const insertFileDAO = new InsertFileDAO({
      databaseDriver,
      fileEntityToFileModelMapper,
    });

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
