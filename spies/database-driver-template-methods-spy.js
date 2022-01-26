module.exports = class DatabaseDriverTemplateMethodsSpy {
  async getClientConnect() {
    return this.clientConnection;
  }

  async singleTransaction(client, statement, values) {
    this.clientTransaction = client;
    this.statement = statement;
    this.values = values;
    return this.response;
  }

  async commit(client) {
    this.clientCommit = client;
  }

  async rollback(client) {
    this.clientRollback = client;
  }

  async clientDisconnect(client) {
    this.clientDisconnection = client;
  }
};
