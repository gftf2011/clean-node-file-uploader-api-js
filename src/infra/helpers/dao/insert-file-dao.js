const PostgresqlDatabaseError = require('../../../utils/errors/database-error');
const ServerError = require('../../../utils/errors/server-error');

module.exports = class InsertFileDAO {
  constructor({ databaseDriver, fileEntityToFileModelMapper } = {}) {
    this.databaseDriver = databaseDriver;
    this.fileEntityToFileModelMapper = fileEntityToFileModelMapper;
  }

  async insertSingleFile(values) {
    if (
      !this.databaseDriver ||
      !this.databaseDriver.getClientConnect ||
      !this.databaseDriver.singleTransaction ||
      !this.databaseDriver.clientDisconnect ||
      !this.databaseDriver.commit ||
      !this.databaseDriver.rollback ||
      !this.fileEntityToFileModelMapper ||
      !this.fileEntityToFileModelMapper.map
    ) {
      throw new ServerError();
    }

    const client = await this.databaseDriver.getClientConnect();

    if (!client) {
      throw new PostgresqlDatabaseError();
    }

    const statement = `INSERT INTO files(name, path) VALUES($1, $2) RETURNING *`;

    try {
      const response = await this.databaseDriver.singleTransaction(
        client,
        statement,
        values,
      );
      await this.databaseDriver.commit(client);
      await this.databaseDriver.clientDisconnect(client);
      return this.fileEntityToFileModelMapper.map(response);
    } catch (_error) {
      await this.databaseDriver.rollback(client);
      await this.databaseDriver.clientDisconnect(client);
      return null;
    }
  }
};
