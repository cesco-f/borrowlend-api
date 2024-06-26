import type { AWS } from '@serverless/typescript';
import * as functions from '@functions/index';
import custom from './serverless/custom';

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
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64',
    versionFunctions: false,
    stage: '${opt:stage, self:custom.defaultStage}',
    region: 'eu-central-1',
    profile: '${self:custom.${self:custom.env}.profile}',
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
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      POWERTOOLS_SERVICE_NAME: '${file(./package.json):name}',
      POWERTOOLS_LOG_LEVEL: 'INFO',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
        Resource: ['*'],
      },
    ],
  },
  functions,
  package: { individually: true },
  custom,
};

module.exports = serverlessConfiguration;
