/* eslint-disable @typescript-eslint/no-unused-vars */
import middy from '@middy/core';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Custom Lambda Middleware Example
 * @param
 */
// eslint-disable-next-line max-len
export default function customMiddleware(): middy.MiddlewareObj<APIGatewayEvent, APIGatewayProxyResult> {
  return {
    before: async (handler): Promise<void> => {
      // some checks here
    },
  };
}
