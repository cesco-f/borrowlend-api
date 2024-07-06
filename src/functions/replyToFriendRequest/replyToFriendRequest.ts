import createHttpError from 'http-errors';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';

const replyToFriendRequest: APIGatewayHandler<
  { userId: string; isAccepted: boolean },
  { friendRequestId: string }
> = async (event) => {
  const { userId, isAccepted } = event.body;
  const { friendRequestId } = event.pathParameters;

  const friendRequest = await prismaClient.friendRequest.findUnique({
    where: { id: event.pathParameters.friendRequestId },
  });

  if (!friendRequest) throw new createHttpError.NotFound(`Friend request with id ${friendRequestId} was not found`);

  if (friendRequest.receiverId !== userId)
    throw new createHttpError.Conflict(
      `User with id ${userId} is not the receiver of friend request with id ${friendRequestId}`
    );

  await prismaClient.friendRequest.delete({ where: { id: friendRequestId } });

  if (isAccepted) {
    await prismaClient.user.update({
      where: { id: friendRequest.senderId },
      data: { friends: { connect: { id: friendRequest.receiverId } } },
    });
  }

  return { statusCode: 200, body: JSON.stringify(friendRequest) };
};

export const main = addLastMiddlewares(
  addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema),
  replyToFriendRequest
);
