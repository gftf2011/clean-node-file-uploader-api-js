const MissingParamError = require("../../utils/errors/missing-param-error");

const HttpResponse = require('../helpers/protocols/http-response');

module.exports = class FileRouter {
    async route(httpRequest) {
        const { originalname, filename } = httpRequest.file;
        if (!originalname) {
            return HttpResponse.badRequest(new MissingParamError('originalname'));
        }
    }
}