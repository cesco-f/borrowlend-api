import createHttpError from 'http-errors';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';

const updateUserItem: APIGatewayHandler<
  {
    isAvailable?: boolean;
  },
  { userId: string; itemId: string }
> = async (event) => {
  const { isAvailable } = event.body;
  const { userId, itemId } = event.pathParameters;

  const item = await prismaClient.userItem
    .update({
      where: { userId_itemId: { userId, itemId } },
      data: { isAvailable },
    })
    .catch((e) => {
      if (e.code === 'P2025')
        throw new createHttpError.NotFound(`Item with id ${itemId} not found for user with id ${userId}`);
      throw e;
    });

  return { statusCode: 200, body: JSON.stringify(item) };
};

export const main = addLastMiddlewares(
  addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema),
  updateUserItem
);
