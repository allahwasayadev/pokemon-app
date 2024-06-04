module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
};
