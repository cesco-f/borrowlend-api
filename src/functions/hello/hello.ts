import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayHandler } from '@libs/types';

/**
 * Endpoint handler example
 * @param event
 */
export const hello: APIGatewayHandler = async (event) => {
  return formatJSONResponse(200, {
    message: 'BorrowLend is coming',
    eventPath: event.path,
  });
};
