const faker = require('faker');

const SutFactory = require('../helpers/factory-methods/insert-file-repository-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');
const ServerError = require('../../../src/utils/errors/server-error');
const PostgresqlDatabaseError = require('../../../src/utils/errors/database-error');

const {
  INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
  INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE,
  INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR,
} = require('../helpers/constants');

describe('InsertFile Repository', () => {
  it('Should call InsertFileDAO with correct values', async () => {
    const { sut, insertFileDAOSpy } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    insertFileDAOSpy.file = {
      originalname: fakeName,
      filename: fakePath,
    };
    const request = {
      name: fakeName,
      path: fakePath,
    };
    await sut.insert(request);
    expect(insertFileDAOSpy.values).toEqual([fakeName, fakePath]);
  });

  it('Should return file with correct values', async () => {
    const { sut, insertFileDAOSpy } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    insertFileDAOSpy.file = {
      name: fakeName,
      path: fakePath,
    };
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const response = await sut.insert(request);
    expect(response).toEqual({
      originalname: fakeName,
      filename: fakePath,
    });
  });

  it('Should return null if InsertFileDAO could not commit transaction', async () => {
    const { sut, insertFileDAOSpy } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    insertFileDAOSpy.file = null;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const response = await sut.insert(request);
    expect(response).toBeNull();
  });

  it('Should return MissingParamError if name is not provided', async () => {
    const { sut } = new SutFactory().create();
    const fakePath = `${faker.datatype.uuid()}.jpg`;
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
    const fakePath = `${faker.datatype.uuid()}.jpg`;
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
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return ServerError if insertFileDAO has no method', async () => {
    const { sut } = new SutFactory().create(
      INSERT_FILE_REPOSITORY_HAS_INSERT_FILE_DAO_WITH_NO_INSERT_SINGLE_FILE,
    );
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should return PostgresqlDatabaseError if insertFileDAO throws error', async () => {
    const { sut } = new SutFactory().create(
      INSERT_FILE_REPOSITORY_SUT_INSERT_FILE_DAO_THROWING_ERROR,
    );
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    const request = {
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insert(request);
    await expect(promise).rejects.toThrow(new PostgresqlDatabaseError());
  });
});
