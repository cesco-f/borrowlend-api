/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';

const method = 'get';

const getPath = (isPrivate = true) => `${'${self:custom.baseApiPath}'}${isPrivate ? '/private' : ''}/hello`;

export const hello = {
  handler: `${handlerPath(__dirname)}/handlers.publicHandler`,
  events: [
    {
      http: {
        method,
        path: getPath(false),
      },
    },
  ],
  iamRoleStatements: [],
  layers: [{ Ref: 'PrismaBorrowlendLambdaLayer' }],
};
