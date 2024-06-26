import middy from '@middy/core';
import { addFirstMiddlewares, addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import customMiddleware from '@libs/middlewares/custom-middleware';
import { hello } from './hello';

const addMiddlewares = (middlewares: middy.MiddlewareObj[] = [], isPrivate = true) => {
  const firstHandler = isPrivate ? addFirstMiddlewares() : addFirstMiddlewaresPublic();

  const handlerTmp = firstHandler.use(customMiddleware());

  middlewares.forEach((m) => handlerTmp.use(m));

  return addLastMiddlewares(handlerTmp, hello);
};

export const privateHandler = addMiddlewares();
export const publicHandler = addMiddlewares([], false);
