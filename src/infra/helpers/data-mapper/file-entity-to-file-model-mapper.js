module.exports = class FileEntityToFileModelMapper {
  map(values) {
    return {
      originalname: values.name,
      filename: values.path,
    };
  }
};
