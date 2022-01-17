const faker = require('faker');

const ServerError = require('../../../src/utils/errors/server-error');
const MissingParamError = require('../../../src/utils/errors/missing-param-error');
const FileNotFoundError = require('../../../src/utils/errors/file-not-found-error');

const SutFactory = require('../helpers/factory-methods/file-delete-use-case-sut-factory');

const {
  FILE_DELETE_USE_CASE_WITH_NO_DEPENDENCY,
  FILE_DELETE_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  FILE_DELETE_USE_CASE_HAS_FILE_DELETE_ADAPTER_WITH_NO_DELETE,
  FILE_DELETE_USE_CASE_HAS_FILE_DELETE_ADAPTER_THROWING_FILE_NOT_FOUND_ERROR,
} = require('../helpers/constants');

describe('FileDelete UseCase', () => {
  it('Should call fileDeleteAdapter when path is provided', async () => {
    const { sut, fileDeleteAdapterSpy } = new SutFactory().create();
    fileDeleteAdapterSpy.delete = jest.fn();
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const response = await sut.execute({ path: fakePath });
    const spyFileDeleteAdapter = jest.spyOn(fileDeleteAdapterSpy, 'delete');
    expect(response).toBeUndefined();
    expect(spyFileDeleteAdapter).toHaveBeenCalled();
    expect(spyFileDeleteAdapter).toHaveBeenCalledTimes(1);
  });

  it('Should call fileDeleteAdapter with correct values', async () => {
    const { sut, fileDeleteAdapterSpy } = new SutFactory().create();
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    await sut.execute({ path: fakePath });
    expect(fileDeleteAdapterSpy.path).toBe(fakePath);
  });

  it('Should return MissingParamError if path is not provided', async () => {
    const { sut } = new SutFactory().create();
    const promise = sut.execute({});
    await expect(promise).rejects.toThrow(new MissingParamError('path'));
  });

  it('Should return ServerError if no dependency is provided', async () => {
    const { sut } = new SutFactory().create(
      FILE_DELETE_USE_CASE_WITH_NO_DEPENDENCY,
    );
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const promise = sut.execute({ path: fakePath });
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return ServerError if dependency is an empty object', async () => {
    const { sut } = new SutFactory().create(
      FILE_DELETE_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
    );
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const promise = sut.execute({ path: fakePath });
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return ServerError if FileDeleteAdapter has no method', async () => {
    const { sut } = new SutFactory().create(
      FILE_DELETE_USE_CASE_HAS_FILE_DELETE_ADAPTER_WITH_NO_DELETE,
    );
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const promise = sut.execute({ path: fakePath });
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return FileNotFoundError if path does not exist in storage', async () => {
    const { sut } = new SutFactory().create(
      FILE_DELETE_USE_CASE_HAS_FILE_DELETE_ADAPTER_THROWING_FILE_NOT_FOUND_ERROR,
    );
    const fakePath = `${faker.image.imageUrl()}/${faker.random.word()}.jpg`;
    const promise = sut.execute({ path: fakePath });
    await expect(promise).rejects.toThrow(new FileNotFoundError(fakePath));
  });
});
