/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const getReceivedFriendRequests = getFunction({
  customPath: 'users/{userId}/receivedFriendRequests',
  method: 'get',
  handler: `${handlerPath(__dirname)}/getReceivedFriendRequests.main`,
});
