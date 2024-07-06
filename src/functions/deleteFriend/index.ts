/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const deleteFriend = getFunction({
  customPath: 'users/{userId}/friends/{friendId}',
  method: 'delete',
  handler: `${handlerPath(__dirname)}/deleteFriend.main`,
});
