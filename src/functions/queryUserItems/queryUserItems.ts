import createHttpError from 'http-errors';
import { UserItem } from '@prisma/client';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';

const queryUserItems: APIGatewayHandler<{ userId: string; query: 'friends' | 'location' }> = async (event) => {
  const { userId, query } = event.body;

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: { friendOf: true, friends: true },
  });

  if (!user) throw new createHttpError.NotFound(`User with id ${userId} not found`);

  const userFriendIds = [...(user.friends ? user.friends : []), ...(user.friendOf ? user.friendOf : [])].map(
    ({ id }) => id
  );

  let userItems: UserItem[] = [];
  if (query === 'friends') {
    userItems = await prismaClient.userItem.findMany({
      where: { userId: { in: userFriendIds } },
      include: { item: true, user: true },
    });
  } else {
    userItems = await prismaClient.userItem.findMany({
      where: { user: { id: { notIn: userFriendIds }, location: user.location } },
      include: { item: true, user: true },
    });
  }

  return { statusCode: 201, body: JSON.stringify(userItems) };
};

export const main = addLastMiddlewares(
  addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema),
  queryUserItems
);
