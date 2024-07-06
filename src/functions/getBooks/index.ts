/* eslint-disable no-template-curly-in-string */
import handlerPath from '@libs/handler-resolver';
import { getFunction } from '@libs/utils';

export const getBooks = getFunction({
  customPath: 'books',
  method: 'get',
  handler: `${handlerPath(__dirname)}/getBooks.main`,
});
