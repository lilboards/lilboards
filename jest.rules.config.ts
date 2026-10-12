import type { JestConfigWithTsJest } from 'ts-jest';

/**
 * Jest config for security rules tests.
 *
 * These run against the Firebase database emulator via
 * `npm run test:rules` and are excluded from the default test run.
 */
const jestConfig: JestConfigWithTsJest = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/rules/**/*.test.ts'],
};

export default jestConfig;
