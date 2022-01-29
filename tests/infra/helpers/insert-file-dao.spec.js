const faker = require('faker');

const PostgresqlDatabaseError = require('../../../src/utils/errors/database-error');
const ServerError = require('../../../src/utils/errors/server-error');

const SutFactory = require('./factory-methods/insert-file-dao-sut-factory');

const {
  INSERT_FILE_DAO_WITH_NO_DEPENDENCY,
  INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_GET_CLIENT_CONNECTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_SINGLE_TRANSACTION,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_CLIENT_DISCONNECT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_COMMIT,
  INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_ROLLBACK,
  INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR,
} = require('./constants');

class MockClient {
  constructor({ properties } = {}) {
    this.properties = properties;
  }
}

describe('InsertFile DAO', () => {
  it('Should return files model response', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create();
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.clientConnection = new MockClient();
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const response = await sut.insertSingleFile(['name', 'path']);
    expect(response).toEqual(databaseDriverTemplateMethodsSpy.response);
    expect(databaseDriverTemplateMethodsSpy.clientCommit).toEqual(
      new MockClient(),
    );
    expect(databaseDriverTemplateMethodsSpy.clientDisconnection).toEqual(
      new MockClient(),
    );
  });

  it('Should return PostgresqlDatabaseError if client is undefined', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create();
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new PostgresqlDatabaseError());
  });

  it('Should return null if single transaction throws error', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_SINGLE_TRANSACTION_SUT_THROWING_ERROR,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.clientConnection = new MockClient();
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const response = await sut.insertSingleFile(['name', 'path']);
    expect(databaseDriverTemplateMethodsSpy.clientRollback).toEqual(
      new MockClient(),
    );
    expect(response).toBeNull();
  });

  it('Should throw ServerError if no dependency is provided', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_WITH_NO_DEPENDENCY,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if dependency is an empty object', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if DatabaseDriverTemplateMethods has no getClientConnection method', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_GET_CLIENT_CONNECTION,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if DatabaseDriverTemplateMethods has no singleTransaction method', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_SINGLE_TRANSACTION,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if DatabaseDriverTemplateMethods has no clientDisconnect method', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_CLIENT_DISCONNECT,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if DatabaseDriverTemplateMethods has no commit method', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_COMMIT,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });

  it('Should throw ServerError if DatabaseDriverTemplateMethods has no rollback method', async () => {
    const { sut, databaseDriverTemplateMethodsSpy } = new SutFactory().create(
      INSERT_FILE_DAO_HAS_DATABASE_DRIVER_TEMPLATE_METHODS_WITH_NO_ROLLBACK,
    );
    const fakeId = faker.datatype.uuid();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.image.imageUrl()}/${fakeName}`;
    databaseDriverTemplateMethodsSpy.response = {
      id: fakeId,
      name: fakeName,
      path: fakePath,
    };
    const promise = sut.insertSingleFile(['name', 'path']);
    await expect(promise).rejects.toThrow(new ServerError());
  });
});
