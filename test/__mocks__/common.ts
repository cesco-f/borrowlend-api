import { randomUUID } from 'crypto';

export const MOCK_MESSAGE = 'MOCK_MESSAGE';

export const MOCK_USER_ID = randomUUID();

export const authorizer = (principalId: string = MOCK_USER_ID) => ({
  authorizer: {
    principalId,
  },
});

export const mockLambdaEvent = (
  params: {
    body?: Record<string, any>;
    queryStringParameters?: Record<string, string> | null;
    pathParameters?: Record<string, string>;
    headers?: Record<string, string>;
  },
  principalId: string = MOCK_USER_ID
) => ({
  ...params,
  requestContext: authorizer(principalId),
  body: params.body && JSON.stringify(params.body),
  httpMethod: 'httpMethod', // This is just to recognize that this is a http event
  headers: { ...params.headers, ['Content-Type']: 'application/json' } as Record<string, string>,
});

export const getErrorMessage = (response: any) => JSON.parse(response.body).message;
