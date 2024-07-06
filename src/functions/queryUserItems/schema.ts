import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: {
        query: { type: 'string', enum: ['friends', 'location'] },
        userId: { type: 'string', format: 'uuid' },
      },
      required: ['query', 'userId'],
    })
  ),
};
