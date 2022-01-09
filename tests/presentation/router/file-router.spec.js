const SutFactory = require('../helpers/factory-methods/file-router-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');

describe('File Router', () => {
  it('Should return 400 if no originalname is provided', async () => {
    const { sut } = new SutFactory().create();
    const httpRequest = {
      file: {
        filename: 'any_filename',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('originalname'));
  });
  it('Should return 400 if no filename is provided', async () => {
    const { sut } = new SutFactory().create();
    const httpRequest = {
      file: {
        originalname: 'any_originalname',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('filename'));
  });
  it('Should return 201 when valid credentials are provided', async () => {
    const { sut, fileUploaderUseCaseSpy } = new SutFactory().create();
    fileUploaderUseCaseSpy.file = {
      originalname: 'any_originalname',
      filename: 'any_filename',
    };
    const httpRequest = {
      file: {
        originalname: 'any_originalname',
        filename: 'any_filename',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(fileUploaderUseCaseSpy.file);
  });
});
