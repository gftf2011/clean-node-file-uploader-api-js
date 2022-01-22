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

module.exports = {
  INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
  INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE,
  INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR,
};
