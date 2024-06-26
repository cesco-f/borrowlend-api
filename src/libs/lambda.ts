import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpSecurityHeaders from '@middy/http-security-headers';
import validator from '@middy/validator';
import middy from '@middy/core';
import warmup from '@middy/warmup';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import httpErrorHandler from '@middy/http-error-handler';
import { APIGatewayHandler } from './types';

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
interface Options {
  eventSchema?: Function | any;
  contextSchema?: Function | any;
  responseSchema?: Function | any;
  defaultLanguage?: string;
  languages?: object | any;
}
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

export function addFirstMiddlewares() {
  return middy<APIGatewayProxyEvent, APIGatewayProxyResult>().use(warmup());
}

export function addFirstMiddlewaresPublic() {
  return addFirstMiddlewares().use(httpSecurityHeaders());
}

export const addValidatorMiddleware = (middyHandler: middy.MiddyfiedHandler, schema: Options) =>
  middyHandler.use(validator(schema));

export const addBodyValidationMiddlewares = (middyHandler: middy.MiddyfiedHandler, schema: Options) =>
  addValidatorMiddleware(middyHandler.use(middyJsonBodyParser()), schema);

export const addLastMiddlewares = <TBody, TPath, TQuery, TRequestContext>(
  middyHandler: middy.MiddyfiedHandler,
  handler: APIGatewayHandler<TBody, TPath, TQuery, TRequestContext>
) => {
  // Issue with types in middy >5.2.3: https://github.com/middyjs/middy/issues/1176
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return middyHandler.use(httpErrorHandler()).handler(handler);
};
