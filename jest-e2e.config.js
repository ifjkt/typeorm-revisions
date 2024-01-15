const base = require('./jest.config.base');
module.exports = {
  ...base,
  coverageDirectory: '../e2e-coverage',
  testMatch: ['<rootDir>/test/*.spec-e2e.ts'],
  silent: false,
};
