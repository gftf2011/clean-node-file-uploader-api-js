const MissingParamError = require('../../utils/errors/missing-param-error');
const ServerError = require('../../utils/errors/server-error');

const HttpResponse = require('../helpers/protocols/http-response');

module.exports = class FileRouter {
  constructor({ fileRecordUseCase } = {}) {
    this.fileRecordUseCase = fileRecordUseCase;
  }

  async route(httpRequest) {
    try {
      const { originalname, filename } = httpRequest.file;
      if (!originalname) {
        return HttpResponse.badRequest(new MissingParamError('originalname'));
      }
      if (!filename) {
        return HttpResponse.badRequest(new MissingParamError('filename'));
      }
      const file = await this.fileRecordUseCase.execute({
        name: originalname,
        path: filename,
      });
      return HttpResponse.created(file);
    } catch (err) {
      return HttpResponse.serverError(new ServerError());
    }
  }
};
