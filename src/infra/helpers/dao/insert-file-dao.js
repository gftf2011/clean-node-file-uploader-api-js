const PostgresqlDatabaseError = require('../../../utils/errors/database-error');
const ServerError = require('../../../utils/errors/server-error');

module.exports = class InsertFileDAO {
  constructor({
    databaseDriverTemplateMethods,
    fileEntityToFileModelMapper,
  } = {}) {
    this.databaseDriverTemplateMethods = databaseDriverTemplateMethods;
    this.fileEntityToFileModelMapper = fileEntityToFileModelMapper;
  }

  async insertSingleFile(values) {
    if (
      !this.databaseDriverTemplateMethods ||
      !this.databaseDriverTemplateMethods.getClientConnect ||
      !this.databaseDriverTemplateMethods.singleTransaction ||
      !this.databaseDriverTemplateMethods.clientDisconnect ||
      !this.databaseDriverTemplateMethods.commit ||
      !this.databaseDriverTemplateMethods.rollback ||
      !this.fileEntityToFileModelMapper ||
      !this.fileEntityToFileModelMapper.map
    ) {
      throw new ServerError();
    }

    const client = await this.databaseDriverTemplateMethods.getClientConnect();

    if (!client) {
      throw new PostgresqlDatabaseError();
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
      await this.databaseDriverTemplateMethods.clientDisconnect(client);
      return this.fileEntityToFileModelMapper.map(response);
    } catch (_error) {
      await this.databaseDriverTemplateMethods.rollback(client);
      await this.databaseDriverTemplateMethods.clientDisconnect(client);
      return null;
    }
  }
};
