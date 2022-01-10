module.exports = class FileRecordUseCaseSpy {
  async execute({ name, path }) {
    this.name = name;
    this.path = path;
    return this.file;
  }
};
