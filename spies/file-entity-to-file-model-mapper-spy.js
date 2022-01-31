module.exports = class FileEntityToFileModelMapperSpy {
  map({ name, path }) {
    return {
      originalname: name,
      filename: path,
    };
  }
};
