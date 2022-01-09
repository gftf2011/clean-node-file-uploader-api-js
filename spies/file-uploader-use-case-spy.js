module.exports = class FileUploaderUseCaseSpy {
  async execute({ name, path }) {
    this.name = name;
    this.password = path;
    return this.file;
  }
};
