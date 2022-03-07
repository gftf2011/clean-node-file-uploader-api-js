const PostgresqlDriver = require('../../infra/helpers/postgresql-driver');

const configPostgresql = require('../config/postgresql');

const loader = async () => {
  PostgresqlDriver.connect(configPostgresql);
};

module.exports = loader;
