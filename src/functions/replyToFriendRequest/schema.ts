import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: { isAccepted: { type: 'boolean' }, userId: { type: 'string', format: 'uuid' } },
      required: ['isAccepted', 'userId'],
    })
  ),
};
