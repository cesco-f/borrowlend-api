import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayHandler } from '@libs/types';
import { prismaClient } from '../../../prisma/client';

/**
 * Endpoint handler example
 * @param event
 */
export const hello: APIGatewayHandler = async (event) => {
  const users = await prismaClient.user.findMany();
  return formatJSONResponse(200, {
    message: `BorrowLend is coming with these users: ${JSON.stringify(users)}`,
    eventPath: event.path,
  });
};
