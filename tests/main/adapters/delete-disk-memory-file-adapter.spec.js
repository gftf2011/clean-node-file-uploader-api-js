const path = require('path');
const fs = require('fs');

const SutFactory = require('./helpers/factories/delete-disk-memory-file-adapter-factory');

describe('DeleteDiskMemoryFile Adapter', () => {
  it('Should delete file if exists', async () => {
    const src = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.png',
    );
    const dest = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
      'test-image.png',
    );
    const { sut } = new SutFactory().create();

    fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);

    expect(fs.existsSync(dest)).toBe(true);

    await sut.delete('test-image.png');

    expect(fs.existsSync(dest)).toBe(false);
  });
});
