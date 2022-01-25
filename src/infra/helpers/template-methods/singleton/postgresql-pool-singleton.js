const { Pool } = require('pg');

module.exports = class PostgresqlPoolSingleton {
  createInstance(host, database, user, password, port, max) {
    this.instance = new Pool({
      host,
      user,
      password,
      database,
      port,
      max,
    });

    return this.instance;
  }

  getInstance(host, database, user, password, port, max) {
    if (!this.instance) {
      this.instance = this.createInstance(
        host,
        database,
        user,
        password,
        port,
        max,
      );
    }
    return this.instance;
  }
};
