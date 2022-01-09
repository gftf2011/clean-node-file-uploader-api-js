module.exports = class MissingParamError {
    constructor(paramName) {
      this.field = [paramName];
      this.message = `Missing param: "${paramName}"`;
      this.name = 'MissingParamError';
    }
};
  