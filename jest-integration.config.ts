import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@mocks/(.*)': '<rootDir>/test/__mocks__/$1',
    '^@middy/(.*)$': '<rootDir>/node_modules/@middy/$1',
  },
  rootDir: '.',
  setupFiles: ['<rootDir>/test/setEnvVars.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.integration-spec.{ts,js}'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@middy/.*|ajv-ftl-i18n|fluent-transpiler|@eolas/middy)/)'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-jest-integration.xml',
        suiteName: 'Integration tests',
      },
    ],
  ],
};

export default config;
