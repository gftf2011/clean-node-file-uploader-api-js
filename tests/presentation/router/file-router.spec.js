const faker = require('faker');

const SutFactory = require('../helpers/factory-methods/file-router-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');
const ServerError = require('../../../src/utils/errors/server-error');

const {
  FILE_ROUTER_SUT_FILE_UPLOADER_USE_CASE_THROWING_ERROR,
} = require('../helpers/constants');

describe('File Router', () => {
  it('Should return 400 if no originalname is provided', async () => {
    const { sut } = new SutFactory().create();
    const fakeFilename = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const httpRequest = {
      file: {
        filename: fakeFilename,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('originalname'));
  });

  it('Should return 400 if no filename is provided', async () => {
    const { sut } = new SutFactory().create();
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('filename'));
  });

  it('Should return 201 when valid credentials are provided', async () => {
    const { sut, fileUploaderUseCaseSpy } = new SutFactory().create();
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    fileUploaderUseCaseSpy.file = {
      originalname: fakeOriginalname,
      filename: fakeFilename,
    };
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(fileUploaderUseCaseSpy.file);
  });

  it('Should return 500 when FileUploaderUseCase calls crashes', async () => {
    const { sut, fileUploaderUseCaseSpy } = new SutFactory().create(
      FILE_ROUTER_SUT_FILE_UPLOADER_USE_CASE_THROWING_ERROR,
    );
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const spyFileUploaderUseCase = jest.spyOn(
      fileUploaderUseCaseSpy,
      'execute',
    );
    const httpResponse = await sut.route(httpRequest);
    expect(spyFileUploaderUseCase).toHaveBeenCalled();
    expect(spyFileUploaderUseCase).toHaveBeenCalledTimes(1);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
