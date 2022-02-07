const config = require('./jest.config');

config.testMatch = ['**/*.spec.js'];
config.coveragePathIgnorePatterns = [
  'node_modules',
  '<rootDir>/src/main/index.js',
  '<rootDir>/src/main/adapters',
  '<rootDir>/src/main/bootstrap',
  '<rootDir>/src/main/composers',
  '<rootDir>/src/main/config/routes.js',
  '<rootDir>/src/main/routes/file-routes.js',
];
module.exports = config;
