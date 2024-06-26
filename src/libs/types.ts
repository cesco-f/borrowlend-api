import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
  APIGatewayProxyWithLambdaAuthorizerEvent,
  Handler,
} from 'aws-lambda';

interface Authorizer {
  isFederated: string;
  principalId: string;
  email: string;
  departments?: string;
  isGlobalAdmin: string;
}

export interface Department {
  orgName: string;
  orgId: string;
  activeHospitalTab: boolean;
  appType: string;
  departmentId: string;
  sharedDepartment: string;
  sharedOrganisation: string;
  role: 'admin' | 'user';
  accessType: string;
}

export type EmptyObject = Record<string, never>;

export type APIGatewayEvent<
  TBody = EmptyObject,
  TPath = EmptyObject,
  TQuery = EmptyObject,
  TRequestContext = EmptyObject,
> = Omit<
  APIGatewayProxyWithLambdaAuthorizerEvent<Authorizer>,
  'body' | 'pathParameters' | 'queryStringParameters' | 'requestContext'
> & {
  body: TBody;
  pathParameters: APIGatewayProxyEventPathParameters & TPath;
  queryStringParameters: APIGatewayProxyEventQueryStringParameters & TQuery;
  requestContext: APIGatewayEventRequestContextWithAuthorizer<Authorizer> & TRequestContext;
};

export type APIGatewayHandler<
  TBody = EmptyObject,
  TPath = EmptyObject,
  TQuery = EmptyObject,
  TRequestContext = EmptyObject,
> = Handler<APIGatewayEvent<TBody, TPath, TQuery, TRequestContext>, APIGatewayProxyResult>;

// Mails
export interface IMailBody {
  name: string;
}
