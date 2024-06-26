// eslint-disable-next-line import/no-extraneous-dependencies
import { Lambda } from '@aws-sdk/client-lambda';

const createAuthProxyFn = (functionName) => {
  return async (event) => {
    const lambda = new Lambda();
    const result = await lambda.invoke({
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(event),
    });

    if (result.StatusCode === 200) {
      return JSON.parse(result.Payload.transformToString());
    }

    throw Error('Authorizer error');
  };
};

const myLocalAuthorizerFn = createAuthProxyFn('eolas-authorizer-dev-customAuthorizer');
const myLocalCommunityAuthorizerFn = createAuthProxyFn('eolas-authorizer-dev-communityAuthorizer');

export { myLocalAuthorizerFn, myLocalCommunityAuthorizerFn };
