const faker = require('faker');

const SutFactory = require('./factories/file-entity-tofile-model-mapper-factory');

describe('FileEntity To FileModel Mapper', () => {
  it('Should return files model response after mapping', () => {
    const { sut } = new SutFactory().create();
    const fakeName = `${faker.random.word()}.jpg`;
    const fakePath = `${faker.datatype.uuid()}.jpg`;
    const values = {
      name: fakeName,
      path: fakePath,
    };
    expect(sut.map(values)).toEqual({
      originalname: values.name,
      filename: values.path,
    });
  });
});
