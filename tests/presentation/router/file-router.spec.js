const faker = require('faker');

const SutFactory = require('../helpers/factory-methods/file-router-sut-factory');

const FileRouter = require('../../../src/presentation/routers/file-router');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');
const ServerError = require('../../../src/utils/errors/server-error');

const {
  FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR,
} = require('../helpers/constants');

describe('File Router', () => {
  it('Should call FileRecordUseCase with correct values', async () => {
    const { sut, fileRecordUseCaseSpy } = new SutFactory().create();
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    fileRecordUseCaseSpy.file = {
      originalname: fakeOriginalname,
      filename: fakeFilename,
    };
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    await sut.route(httpRequest);
    expect(fileRecordUseCaseSpy.name).toBe(fakeOriginalname);
    expect(fileRecordUseCaseSpy.path).toBe(fakeFilename);
  });

  it('Should return 201 when valid credentials are provided', async () => {
    const { sut, fileRecordUseCaseSpy } = new SutFactory().create();
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    fileRecordUseCaseSpy.file = {
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
    expect(httpResponse.body).toEqual(fileRecordUseCaseSpy.file);
  });

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

  it('Should return 500 when FileUploaderUseCase calls crashes', async () => {
    const { sut, fileRecordUseCaseSpy } = new SutFactory().create(
      FILE_ROUTER_SUT_FILE_RECORD_USE_CASE_THROWING_ERROR,
    );
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const spyFileRecordUseCase = jest.spyOn(fileRecordUseCaseSpy, 'execute');
    const httpResponse = await sut.route(httpRequest);
    expect(spyFileRecordUseCase).toHaveBeenCalled();
    expect(spyFileRecordUseCase).toHaveBeenCalledTimes(1);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should return 500 if no dependency is provided', async () => {
    const sut = new FileRouter();
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should return 500 if dependency is an empty object', async () => {
    const sut = new FileRouter({});
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should return 500 if FileRecordUseCase has no execute method', async () => {
    const sut = new FileRouter({ fileUploaderUseCase: {} });
    const fakeOriginalname = `${faker.random.word()}.jpg`;
    const fakeFilename = `${faker.image.imageUrl()}/${fakeOriginalname}`;
    const httpRequest = {
      file: {
        originalname: fakeOriginalname,
        filename: fakeFilename,
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
