const { Pool } = require('pg');

module.exports = class PostgresqlPoolSingleton {
  createInstance(host, user, max) {
    this.instance = new Pool({
      host,
      user,
      max,
    });

    return this.instance;
  }

  getInstance(host, user, max) {
    if (!this.instance) {
      this.instance = this.createInstance(host, user, max);
    }
    return this.instance;
  }
};
