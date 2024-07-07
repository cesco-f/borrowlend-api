import { User } from '@prisma/client';
import { APIGatewayEvent } from 'aws-lambda';

type Method = 'post' | 'get' | 'put' | 'patch' | 'delete';

type SchemaType = keyof Pick<APIGatewayEvent, 'body' | 'queryStringParameters' | 'pathParameters'>;

interface SchemaData<T> {
  properties: T;
  required: (keyof T)[];
  canBeNull?: boolean;
}

function getGeneralSchema<T extends Record<string, unknown>>(
  schemaType: SchemaType,
  { properties, required, canBeNull }: SchemaData<T>
) {
  return {
    type: 'object',
    required: [schemaType],
    properties: {
      [schemaType]: {
        type: ['object', ...(canBeNull ? ['null'] : [])],
        required,
        properties,
        additionalProperties: false,
      },
    },
  };
}

export function getBodySchema<T extends Record<string, unknown>>(schemaData: SchemaData<T>) {
  return getGeneralSchema('body', schemaData);
}

export const getFunction = ({
  handler,
  method,
  customPath,
}: {
  handler: string;
  method: Method;
  customPath: string;
}) => ({
  handler,
  events: [
    {
      http: {
        method,
        // eslint-disable-next-line no-template-curly-in-string
        path: `${'${self:custom.baseApiPath}'}/${customPath}`,
      },
    },
  ],
  iamRoleStatements: [],
  layers: [{ Ref: 'PrismaBorrowlendLambdaLayer' }],
});

const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const mapUser = (
  user: User & { friends?: User[] | null; friendOf?: User[] | null }
): User & { friends?: User[]; friendOf: undefined } => ({
  ...user,
  lastName: capitalizeFirstLetter(user.lastName),
  name: capitalizeFirstLetter(user.name),
  location: capitalizeFirstLetter(user.location),
  friends:
    user.friends || user.friendOf
      ? [...(user.friends ? user.friends.map(mapUser) : []), ...(user.friendOf ? user.friendOf.map(mapUser) : [])]
      : undefined,
  friendOf: undefined,
});
