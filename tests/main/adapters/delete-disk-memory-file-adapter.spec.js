const faker = require('faker');
const fs = require('fs');
const { resolve } = require('path');

const DeleteDiskMemoryFileAdapter = require('../../../src/main/adapters/delete-disk-memory-file-adapter');

const DESTINATION_FILE_NAME = `${faker.datatype.uuid()}.png`;
const SOURCE_FILE = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'public',
  'test',
  'test-image.png',
);
const DESTINATION_FILE = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'temp',
  'uploads',
  DESTINATION_FILE_NAME,
);

describe('DeleteDiskMemoryFile Adapter', () => {
  let sut;

  beforeAll(() => {
    sut = new DeleteDiskMemoryFileAdapter();
  });

  it('Should delete file if exists', async () => {
    fs.copyFileSync(SOURCE_FILE, DESTINATION_FILE);

    await sut.delete(DESTINATION_FILE_NAME);

    const fileExists = fs.existsSync(DESTINATION_FILE);

    expect(fileExists).toBe(false);
  });
});
