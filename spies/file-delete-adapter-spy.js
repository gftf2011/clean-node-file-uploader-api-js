module.exports = class FileDeleteAdapterSpy {
  async delete(path) {
    this.path = path;
  }
};
