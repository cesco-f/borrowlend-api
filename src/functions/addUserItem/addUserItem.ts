import createHttpError from 'http-errors';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';
import logger from '@libs/logger';

const addUserItem: APIGatewayHandler<{
  id: string;
  author: string;
  title: string;
  description: string;
  language: string;
  coverUrl: string;
  userId: string;
}> = async (event) => {
  const { id, author, title, description, language, coverUrl, userId } = event.body;

  let item = await prismaClient.item.findUnique({ where: { id } });

  if (!item) {
    logger.info(`Item with id ${id} not found, creating the item and connecting to user with id ${userId}`);
    item = await prismaClient.item.create({
      data: {
        author,
        id,
        language,
        title,
        coverUrl,
        description,
        userItems: { create: { user: { connect: { id: userId } } } },
      },
    });
  } else {
    logger.info(`Item with id ${id} found, connecting to user with id ${userId}`);
    await prismaClient.user
      .update({
        where: { id: userId },
        data: { items: { create: { item: { connect: { id } } } } },
      })
      .catch((e) => {
        if (e.code === 'P2002')
          throw new createHttpError.Conflict(`User with id ${userId} already has item with id ${id}`);

        throw e;
      });
  }

  return { statusCode: 201, body: JSON.stringify(item) };
};

export const main = addLastMiddlewares(addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema), addUserItem);
