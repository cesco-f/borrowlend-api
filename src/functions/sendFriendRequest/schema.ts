import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: { friendId: { type: 'string', format: 'uuid' }, userId: { type: 'string', format: 'uuid' } },
      required: ['friendId', 'userId'],
    })
  ),
};
