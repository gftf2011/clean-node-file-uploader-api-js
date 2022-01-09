const SutFactory = require('../helpers/factory-methods/file-router-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');

describe('File Router', () => {
    it('Should return 400 if no originalname is provided', async () => {
        const { sut } = new SutFactory().create();
        const httpRequest = {
            file: {},
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('originalname'));
    });
});
