import createHttpError from 'http-errors';
import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { prismaClient } from 'prisma/client';
import { mapUser } from '@libs/utils';

const getUserById: APIGatewayHandler<EmptyObject, { userId: string }> = async (event) => {
  const { userId } = event.pathParameters;
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      friendOf: { include: { items: true } },
      friends: { include: { items: true } },
      items: { include: { item: true } },
      receivedFriendRequests: { include: { sender: true } },
      sentFriendRequests: true,
    },
  });

  if (!user) throw new createHttpError.NotFound(`User with id ${userId} not found`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...mapUser(user),
      receivedFriendRequests: user.receivedFriendRequests.map((r) => ({ ...r, sender: mapUser(r.sender) })),
    }),
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), getUserById);
