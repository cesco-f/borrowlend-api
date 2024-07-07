import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { prismaClient } from 'prisma/client';

const getReceivedFriendRequests: APIGatewayHandler<EmptyObject, { userId: string }> = async (event) => {
  const { userId } = event.pathParameters;
  const friendRequests = await prismaClient.friendRequest.findMany({
    where: { receiverId: userId },
    include: {
      sender: true,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(friendRequests),
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), getReceivedFriendRequests);
