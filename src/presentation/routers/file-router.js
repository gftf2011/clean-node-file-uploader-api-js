const MissingParamError = require('../../utils/errors/missing-param-error');

const HttpResponse = require('../helpers/protocols/http-response');

module.exports = class FileRouter {
  // eslint-disable-next-line consistent-return
  async route(httpRequest) {
    const { originalname, filename } = httpRequest.file;
    if (!originalname) {
      return HttpResponse.badRequest(new MissingParamError('originalname'));
    }
    if (!filename) {
      return HttpResponse.badRequest(new MissingParamError('filename'));
    }
  }
};
