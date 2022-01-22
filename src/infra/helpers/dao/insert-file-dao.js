const PostgresqlDatabaseError = require('../../../utils/errors/database-error');

module.exports = class InsertFileDAO {
  constructor({ databaseDriverTemplateMethods } = {}) {
    this.databaseDriverTemplateMethods = databaseDriverTemplateMethods;
  }

  async insertSingleFile(values) {
    const client = await this.databaseDriverTemplateMethods.getClientConnect();

    if (!client) {
      throw new PostgresqlDatabaseError(
        'Could not connect to postgreSQL client',
      );
    }

    const statement = `INSERT INTO files(name, path) VALUES($1, $2) RETURNING *`;

    try {
      const response =
        await this.databaseDriverTemplateMethods.singleTransaction(
          client,
          statement,
          values,
        );
      await this.databaseDriverTemplateMethods.commit(client);
      return response;
    } catch (_error) {
      await this.databaseDriverTemplateMethods.rollback(client);
      return null;
    } finally {
      await this.databaseDriverTemplateMethods.clientDisconnect(client);
    }
  }
};
