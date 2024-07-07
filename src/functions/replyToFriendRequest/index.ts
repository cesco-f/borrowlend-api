/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const replyToFriendRequest = getFunction({
  customPath: 'friendRequests/{friendRequestId}',
  method: 'post',
  handler: `${handlerPath(__dirname)}/replyToFriendRequest.main`,
});
