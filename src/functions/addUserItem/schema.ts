import { transpileSchema } from '@middy/validator/transpile';
import { getBodySchema } from '@libs/utils';

export default {
  eventSchema: transpileSchema(
    getBodySchema({
      properties: {
        id: { type: 'string' },
        author: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        language: { type: 'string' },
        coverUrl: { type: 'string' },
        userId: { type: 'string', format: 'uuid' },
      },
      required: ['id', 'author', 'coverUrl', 'description', 'language', 'title', 'userId'],
    })
  ),
};
