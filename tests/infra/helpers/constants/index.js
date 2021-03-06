/**
 * Insert File Repository
 */
const INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY = Symbol(
  'INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY',
);
const INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY = Symbol(
  'INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY',
);
const INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE =
  Symbol(
    'INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE',
  );
const INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR = Symbol(
  'INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR',
);

/**
 * Insert File DAO
 */
const INSERT_FILE_DAO_WITH_NO_DEPENDENCY = Symbol(
  'INSERT_FILE_DAO_WITH_NO_DEPENDENCY',
);
const INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY = Symbol(
  'INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY',
);
const INSERT_FILE_DAO_WITH_NO_FILE_ENTITY_TO_FILE_MODEL_MAPPER_AS_DEPENDENCY =
  Symbol(
    'INSERT_FILE_DAO_WITH_NO_FILE_ENTITY_TO_FILE_MODEL_MAPPER_AS_DEPENDENCY',
  );
const INSERT_FILE_DAO_WITH_HAS_FILE_ENTITY_TO_FILE_MODEL_MAPPER_WITH_NO_MAP =
  Symbol(
    'INSERT_FILE_DAO_WITH_HAS_FILE_ENTITY_TO_FILE_MODEL_MAPPER_WITH_NO_MAP',
  );
const INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_GET_CLIENT_CONNECTION =
  Symbol('INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_GET_CLIENT_CONNECTION');
const INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_SINGLE_TRANSACTION = Symbol(
  'INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_SINGLE_TRANSACTION',
);
const INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_CLIENT_DISCONNECT = Symbol(
  'INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_CLIENT_DISCONNECT',
);
const INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_COMMIT = Symbol(
  'INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_COMMIT',
);
const INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_ROLLBACK = Symbol(
  'INSERT_FILE_DAO_HAS_DATABASE_DRIVER_WITH_NO_ROLLBACK',
);
const INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR = Symbol(
  'INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR',
);

module.exports = {
  INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
  INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE,
  INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR,
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
};
