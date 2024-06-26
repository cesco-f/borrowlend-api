export default {
  defaultStage: 'dev',
  apiName: '${self:provider.stage}-${self:service}',
  basePath: 'borrowlend',
  baseApiPath: '/v1',
  env: '${self:custom.${self:provider.stage}.env, "dev"}',
  dev: {
    profile: 'borrowlend',
    env: 'dev',
    minify: false,
    sourcemap: true,
  },
  esbuild: {
    bundle: true,
    minify: '${self:custom.${self:provider.stage}.minify, false}',
    sourcemap: '${self:custom.${self:provider.stage}.sourcemap, true}',
    target: 'node20',
    define: { 'require.resolve': undefined },
    platform: 'node',
    concurrency: 10,
    keepNames: true,
    mainFields: ['module', 'main'],
    resolveExtensions: ['.ts', '.js', '.mjs'],
  },
  'export-env': {
    filename: '.env',
    overwrite: true,
  },
  'serverless-offline': {
    reloadHandler: true,
  },
};
