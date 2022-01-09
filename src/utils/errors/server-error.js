module.exports = class ServerError {
  constructor() {
    this.message = 'Server is not responding';
    this.name = 'ServerError';
  }
};
