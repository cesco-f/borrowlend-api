/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const queryUserItems = getFunction({
  customPath: 'userItems',
  method: 'post',
  handler: `${handlerPath(__dirname)}/queryUserItems.main`,
});
