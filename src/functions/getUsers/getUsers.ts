import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { prismaClient } from 'prisma/client';
import logger from '@libs/logger';
import { mapUser } from '@libs/utils';

const getUsers: APIGatewayHandler<EmptyObject, EmptyObject, { q: string }> = async (event) => {
  const { q } = event.queryStringParameters;
  logger.info(`Getting users with q:${q}`);
  const users = await prismaClient.user.findMany({
    where: { OR: [{ name: { contains: q } }, { lastName: { contains: q } }] },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(users.map(mapUser)),
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), getUsers);
