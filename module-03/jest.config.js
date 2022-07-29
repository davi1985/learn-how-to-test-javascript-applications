module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  displayName: {
    name: 'root-tests',
    color: 'cyan',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/components/**/*.js',
    '<rootDir>/pages/**/*.js',
  ],
};
