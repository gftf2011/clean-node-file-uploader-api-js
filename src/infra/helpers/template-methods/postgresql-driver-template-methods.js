const PostgresqlPoolSingleton = require('./singleton/postgresql-pool-singleton');

module.exports = {
  connect({ host, database, user, password, port, max } = {}) {
    this.pool = new PostgresqlPoolSingleton().getInstance(
      host,
      database,
      user,
      password,
      port,
      max,
    );
  },

  async disconnect() {
    await this.pool.end();
  },

  async getClientConnect() {
    const client = await this.pool.connect();
    return client;
  },

  async clientDisconnect(client) {
    client.release();
  },

  async singleTransaction(client, statement, values) {
    await client.query('BEGIN');
    const response = await client.query(statement, values);
    return response.rows[0];
  },

  async commit(client) {
    await client.query('COMMIT');
  },

  async rollback(client) {
    await client.query('ROLLBACK');
  },
};
