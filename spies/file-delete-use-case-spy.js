module.exports = class FileDeleteUseCaseSpy {
  async execute({ path }) {
    this.path = path;
    return this.deletedFile;
  }
};
