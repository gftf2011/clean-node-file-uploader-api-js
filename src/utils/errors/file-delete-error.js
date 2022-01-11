module.exports = class FileDeleteError {
  constructor(pathName) {
    this.fields = { path: pathName };
    this.message = `Could not delete file at: "${pathName}"`;
    this.name = 'FileDeleteError';
  }
};
