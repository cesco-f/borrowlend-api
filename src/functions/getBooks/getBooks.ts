import { APIGatewayHandler, EmptyObject } from '@libs/types';
import { addFirstMiddlewaresPublic, addLastMiddlewares } from '@libs/lambda';
import { getAllBooks, isBookWithCompleteInfo, mapGoogleToBL } from './utils';
import logger from '@libs/logger';

const getBooks: APIGatewayHandler<EmptyObject, EmptyObject, { q: string; language: string }> = async (event) => {
  const googleApiVolumes = await getAllBooks(event.queryStringParameters);

  const blBooks = googleApiVolumes.filter(isBookWithCompleteInfo).map(mapGoogleToBL);

  logger.info(`${googleApiVolumes.length - blBooks.length} books were discarded because not containing complete info`);

  return {
    statusCode: 200,
    body: JSON.stringify(blBooks.filter(({ language }) => language === event.queryStringParameters.language)),
  };
};

export const main = addLastMiddlewares(addFirstMiddlewaresPublic(), getBooks);
