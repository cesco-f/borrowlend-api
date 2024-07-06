import createHttpError from 'http-errors';
import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { prismaClient } from 'prisma/client';

const deleteUserItem: APIGatewayHandler<EmptyObject, { userId: string; itemId: string }> = async (event) => {
  const { itemId, userId } = event.pathParameters;

  await prismaClient.userItem.delete({ where: { userId_itemId: { userId, itemId } } }).catch((e) => {
    if (e.code === 'P2025')
      throw new createHttpError.NotFound(`User with id ${userId} does not have item with id ${itemId} in their list`);

    throw e;
  });

  return { statusCode: 204, body: '' };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), deleteUserItem);
