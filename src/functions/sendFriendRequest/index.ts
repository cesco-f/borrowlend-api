/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const sendFriendRequest = getFunction({
  customPath: 'friendRequests',
  method: 'post',
  handler: `${handlerPath(__dirname)}/sendFriendRequest.main`,
});
