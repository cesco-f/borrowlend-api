import createHttpError from 'http-errors';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';

const sendFriendRequest: APIGatewayHandler<{ userId: string; friendId: string }> = async (event) => {
  const { userId, friendId } = event.body;

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: { friendOf: true, friends: true },
  });

  if (!user) throw new createHttpError.NotFound(`User with id ${userId} does not exist`);

  if (user.friendOf?.some(({ id }) => id === friendId) || user.friends?.some(({ id }) => id === friendId))
    throw new createHttpError.Conflict(`User with id ${userId} is already friend of user with id ${friendId}`);

  if (
    (await prismaClient.friendRequest.findUnique({
      where: { senderId_receiverId: { senderId: friendId, receiverId: userId } },
    })) !== null
  )
    throw new createHttpError.Conflict(
      `User with id ${friendId} already sent friend request to user with id ${userId}`
    );

  const friendRequest = await prismaClient.friendRequest
    .create({
      data: { sender: { connect: { id: userId } }, receiver: { connect: { id: friendId } } },
    })
    .catch((e) => {
      if (e.code === 'P2002')
        throw new createHttpError.Conflict(
          `User with id ${userId} already sent a request with user with id ${friendId}`
        );
    });

  return { statusCode: 201, body: JSON.stringify(friendRequest) };
};

export const main = addLastMiddlewares(
  addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema),
  sendFriendRequest
);
