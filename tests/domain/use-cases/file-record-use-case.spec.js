const MissingParamError = require('../../../src/utils/errors/missing-param-error');

const SutFactory = require('../helpers/factory-methods/file-record-use-case-sut-factory');

describe('FileRecord UseCase', () => {
  it('Should return MissingParamError when name is not provided', async () => {
    const { sut } = new SutFactory().create();
    const promise = sut.execute({ path: '' });
    await expect(promise).rejects.toThrow(new MissingParamError('name'));
  });
});
