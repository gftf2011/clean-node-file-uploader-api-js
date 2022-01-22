const { DatabaseError } = require('pg');

module.exports = class PostgresqlDatabaseError extends DatabaseError {
  constructor(msg) {
    super(msg);
    this.name = 'PostgresqlDatabaseError';
  }
};
