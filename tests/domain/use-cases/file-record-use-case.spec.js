const faker = require('faker');

const ServerError = require('../../../src/utils/errors/server-error');
const MissingParamError = require('../../../src/utils/errors/missing-param-error');

const SutFactory = require('../helpers/factory-methods/file-record-use-case-sut-factory');

const {
  FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY,
} = require('../helpers/constants');

describe('FileRecord UseCase', () => {
  it('Should call InserFileRepository with correct values', async () => {
    const { sut, insertFileRepositorySpy } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    await sut.execute({ name: fakeName, path: fakePath });
    expect(insertFileRepositorySpy.path).toBe(fakePath);
    expect(insertFileRepositorySpy.name).toBe(fakeName);
  });

  it('Should return file object with correct values', async () => {
    const { sut } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    const response = await sut.execute({ name: fakeName, path: fakePath });
    expect(response).toEqual({
      originalname: fakeName,
      filename: fakePath,
    });
  });

  it('Should return MissingParamError when name is not provided', async () => {
    const { sut } = new SutFactory().create();
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const promise = sut.execute({ path: fakePath });
    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });

  it('Should return MissingParamError when path is not provided', async () => {
    const { sut } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const promise = sut.execute({ name: fakeName });
    await expect(promise).rejects.toThrow(new MissingParamError('path'));
  });

  it('Should return ServerError when no dependency is provided', async () => {
    const { sut } = new SutFactory().create(
      FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY,
    );
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    const promise = sut.execute({ name: fakeName, path: fakePath });
    await expect(promise).rejects.toThrow(new ServerError());
  });
});