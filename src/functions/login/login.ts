import createHttpError from 'http-errors';
import { APIGatewayHandler } from '@libs/types';
import { addFirstMiddlewaresPublic, addBodyValidationMiddlewares, addLastMiddlewares } from '@libs/lambda';
import schema from './schema';
import { prismaClient } from 'prisma/client';
import { userAuth } from '@libs/constants';

const login: APIGatewayHandler<{ email: string; password: string }> = async (event) => {
  const { email, password } = event.body;

  const user = await prismaClient.user.findUnique({ where: { email } });

  if (!user) throw new createHttpError.NotFound('User not found');

  if (!userAuth.some((u) => u.email === email && u.password === password))
    throw new createHttpError.Forbidden('User auth failed');

  return { statusCode: 200, body: JSON.stringify(user) };
};

export const main = addLastMiddlewares(addBodyValidationMiddlewares(addFirstMiddlewaresPublic(), schema), login);
