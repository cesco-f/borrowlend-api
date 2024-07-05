/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const login = getFunction({
  customPath: 'login',
  method: 'post',
  handler: `${handlerPath(__dirname)}/login.main`,
});
