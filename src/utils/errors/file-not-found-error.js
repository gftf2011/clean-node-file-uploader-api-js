module.exports = class FileNotFoundError extends Error {
  constructor(pathName) {
    super(`Could not find file at: "${pathName}"`);
    this.fields = { path: pathName };
    this.name = 'FileNotFoundError';
  }
};
