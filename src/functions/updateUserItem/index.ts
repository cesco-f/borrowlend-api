/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const updateUserItem = getFunction({
  customPath: 'users/{userId}/items/{itemId}',
  method: 'patch',
  handler: `${handlerPath(__dirname)}/updateUserItem.main`,
});
