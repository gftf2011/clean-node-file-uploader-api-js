module.exports = class FileDeleteError extends Error {
  constructor(pathName) {
    super(`Could not delete file at: "${pathName}"`);
    this.fields = { path: pathName };
    this.name = 'FileDeleteError';
  }
};
