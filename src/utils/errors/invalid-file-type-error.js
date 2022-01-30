module.exports = class InvalidFileTypeError extends Error {
  constructor() {
    super('Invalid file type');
    this.name = 'InvalidFileTypeError';
  }
};
