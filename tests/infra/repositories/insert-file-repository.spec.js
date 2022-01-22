const faker = require('faker');

const SutFactory = require('../helpers/factory-methods/insert-file-repository-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');
const ServerError = require('../../../src/utils/errors/server-error');

const {
  INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
  INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
} = require('../helpers/constants');

describe('InsertFile Repository', () => {
  it('Should return MissingParamError if name is not provided', async () => {
    const { sut } = new SutFactory().create();
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const request = {
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });

  it('Should return MissingParamError if path is not provided', async () => {
    const { sut } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const request = {
      name: fakeName,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new MissingParamError('path'));
  });

  it('Should return ServerError if no dependency is provided', async () => {
    const { sut } = new SutFactory().create(
      INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
    );
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return ServerError if dependency is an empty object', async () => {
    const { sut } = new SutFactory().create(
      INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
    );
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new ServerError());
  });
});
