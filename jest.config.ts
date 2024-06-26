import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@mocks/(.*)': '<rootDir>/test/__mocks__/$1',
  },
  rootDir: '.',
  setupFiles: ['<rootDir>/test/setEnvVars.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.{ts,js}'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-jest.xml',
        suiteName: 'Unit tests',
      },
    ],
  ],
};

export default config;
