/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const getUsers = getFunction({
  customPath: 'users',
  method: 'get',
  handler: `${handlerPath(__dirname)}/getUsers.main`,
});
