import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/types/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/test/__mocks__/svgMock.js',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/src/config'],
  preset: 'ts-jest',
  reporters:
    process.env.CI === 'true'
      ? [['github-actions', { silent: false }], 'summary']
      : undefined,
  setupFiles: ['<rootDir>/test/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.ts'],
  testEnvironment: 'jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

export default jestConfig;
