/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const addItem = getFunction({
  customPath: 'items',
  method: 'post',
  handler: `${handlerPath(__dirname)}/addItem.main`,
});
