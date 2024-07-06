/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const deleteUserItem = getFunction({
  customPath: 'users/{userId}/items/{itemId}',
  method: 'delete',
  handler: `${handlerPath(__dirname)}/deleteUserItem.main`,
});
