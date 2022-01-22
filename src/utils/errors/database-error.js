const { DatabaseError } = require('pg');

module.exports = class PostgresqlDatabaseError extends DatabaseError {
  constructor() {
    super('Could not connect to postgreSQL client');
    this.name = 'PostgresqlDatabaseError';
  }
};
