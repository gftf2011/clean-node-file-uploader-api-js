module.exports = class InsertFileRepositorySpy {
  async insert({ name, path }) {
    this.name = name;
    this.path = path;
  }
};
