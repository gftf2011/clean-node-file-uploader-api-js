const faker = require('faker');

const SutFactory = require('./factory-methods/insert-file-dao-sut-factory');

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
});
