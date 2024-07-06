import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { prismaClient } from 'prisma/client';

const deleteFriend: APIGatewayHandler<EmptyObject, { friendId: string; userId: string }> = async (event) => {
  const { friendId, userId } = event.pathParameters;
  await prismaClient.user.update({ where: { id: userId }, data: { friends: { disconnect: { id: friendId } } } });
  await prismaClient.user.update({ where: { id: friendId }, data: { friends: { disconnect: { id: userId } } } });

  return {
    statusCode: 204,
    body: '',
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), deleteFriend);
