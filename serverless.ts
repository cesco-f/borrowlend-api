import type { AWS } from '@serverless/typescript';
import * as functions from '@functions/index';
import custom from './serverless/custom';

const patterns = [
  '!node_modules/prisma',
  '!node_modules/@prisma/engines',
  '!node_modules/.prisma/**/libquery_engine-*',
];

const environment: Record<string, string> = {
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  POWERTOOLS_SERVICE_NAME: '${file(./package.json):name}',
  POWERTOOLS_LOG_LEVEL: 'INFO',
  DATABASE_HOST: '${ssm:/rds-host}',
  DATABASE_USER: '${ssm:/rds-user}',
  DATABASE_PASSWORD: '${ssm:/rds-password}',
  DATABASE_URL:
    'postgresql://${self:provider.environment.DATABASE_USER}:${self:provider.environment.DATABASE_PASSWORD}@${self:provider.environment.DATABASE_HOST}/borrowlend:main?sslmode=require',
  SHADOW_DATABASE_URL:
    'postgresql://${self:provider.environment.DATABASE_USER}:${self:provider.environment.DATABASE_PASSWORD}@${self:provider.environment.DATABASE_HOST}/shadow:main?sslmode=require',
};

if (process.env.IS_LOCAL === 'true') {
  patterns.push('node_modules/.prisma/client/libquery_engine-darwin-*');
}

if (process.env.IS_DEPLOYING === 'true') {
  environment['PRISMA_QUERY_ENGINE_LIBRARY'] = '/opt/nodejs/prisma/libquery_engine-linux-arm64-openssl-3.0.x.so.node';
}

const serverlessConfiguration: AWS = {
  service: '${file(./package.json):name}',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-export-env',
    'serverless-plugin-warmup',
    'serverless-offline-local-authorizers-plugin',
    'serverless-iam-roles-per-function',
    'serverless-domain-manager',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64',
    versionFunctions: false,
    stage: '${opt:stage, self:custom.defaultStage}',
    region: 'eu-central-1',
    profile: 'borrowlend',
    logRetentionInDays: 30,
    deploymentBucket: {
      name: 'borrowlend-serverless-deployments',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    logs: {
      restApi: {
        accessLogging: true,
        executionLogging: false,
        fullExecutionData: false,
      },
    },
    tracing: {
      lambda: true,
      apiGateway: true,
    },
    environment,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
        Resource: ['*'],
      },
    ],
  },
  functions,
  package: { individually: true, patterns },
  custom,
  layers: {
    PrismaBorrowlend: {
      path: 'lambda-layers/prisma',
      compatibleArchitectures: ['arm64'],
      compatibleRuntimes: ['nodejs20.x'],
      description: 'Lambda layer containing the prisma query engine library for borrowlend',
    },
  },
};

module.exports = serverlessConfiguration;
