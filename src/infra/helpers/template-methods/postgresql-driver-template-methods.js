const PostgresqlPoolSingleton = require('./singleton/postgresql-pool-singleton');

module.exports = {
  connect({ host, user, max } = {}) {
    this.pool = new PostgresqlPoolSingleton().getInstance(host, user, max);
  },

  async disconnect() {
    await this.pool.end();
  },

  async getClientConnect() {
    const client = await this.pool.connect();
    return client;
  },

  async clientDisconnect(client) {
    await client.end();
  },

  async singleTransaction(client, statement, values) {
    await client.query('BEGIN');
    const response = await client.query(statement, values);
    await client.query('COMMIT');
    return response.rows[0];
  },

  async rollback(client) {
    await client.query('ROLLBACK');
  },
};
