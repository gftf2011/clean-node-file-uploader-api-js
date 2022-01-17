const faker = require('faker');

const MissingParamError = require('../../../src/utils/errors/missing-param-error');

const SutFactory = require('../helpers/factory-methods/file-delete-use-case-sut-factory');

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

  it('Should return MissingParamError if path is not provided', async () => {
    const { sut } = new SutFactory().create();
    const promise = sut.execute({});
    await expect(promise).rejects.toThrow(new MissingParamError('path'));
  });
});
