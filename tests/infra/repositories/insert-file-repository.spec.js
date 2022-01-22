const faker = require('faker');

const SutFactory = require('../helpers/factory-methods/insert-file-repository-sut-factory');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');

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
});
