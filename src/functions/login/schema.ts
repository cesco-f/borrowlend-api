import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' } },
      required: ['email', 'password'],
    })
  ),
};
