module.exports = class InsertFileDAOSpy {
  async insertSingleFile(values) {
    this.values = values;
    return this.file;
  }
};
