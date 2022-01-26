const InsertFileDAO = require('../../../../src/infra/helpers/dao/insert-file-dao');

const DependenciesFactory = require('../factories/insert-file-dao-dependencies-factory');

module.exports = class SutFactory {
  create(_type) {
    this.dependencies = new DependenciesFactory().create();

    this.sut = new InsertFileDAO({
      databaseDriverTemplateMethods:
        this.dependencies.databaseDriverTemplateMethodsSpy,
    });

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
