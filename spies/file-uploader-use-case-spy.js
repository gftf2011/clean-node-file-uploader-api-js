module.exports = class FileUploaderUseCaseSpy {
  async execute({ name, path }) {
    this.name = name;
    this.path = path;
    return this.file;
  }
};
