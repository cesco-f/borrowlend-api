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
      friendOf: true,
      friends: true,
      items: true,
      receivedFriendRequests: { include: { sender: true } },
      sentFriendRequests: true,
    },
  });

  if (!user) throw new createHttpError.NotFound(`User with id ${userId} not found`);

  return {
    statusCode: 200,
    body: JSON.stringify(mapUser(user)),
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), getUserById);
