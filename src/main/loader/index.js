const PostgresqlDriverTemplateMethods = require('../../infra/helpers/template-methods/postgresql-driver-template-methods');

const configPostgresql = require('../config/postgresql');

const loader = async () => {
  PostgresqlDriverTemplateMethods.connect(configPostgresql);
};

module.exports = loader;
