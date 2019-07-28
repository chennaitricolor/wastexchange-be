module.exports = {
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  reporters: ['default', 'jest-junit']
};
