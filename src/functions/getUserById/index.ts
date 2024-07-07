/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const getUserById = getFunction({
  customPath: 'users/{userId}',
  method: 'get',
  handler: `${handlerPath(__dirname)}/getUserById.main`,
});
