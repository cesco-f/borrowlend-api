import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: {
        isAvailable: { type: 'boolean' },
      },
      required: [],
    })
  ),
};
