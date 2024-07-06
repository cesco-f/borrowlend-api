import axios from 'axios';
import logger from '@libs/logger';
import { BLBook, GoogleApiVolumeWithCompleteInfo, GoogleApiVolume, GoogleBooksApiResponse } from './types';

export const isBookWithCompleteInfo = (book: GoogleApiVolume): book is GoogleApiVolumeWithCompleteInfo => {
  return (
    Boolean(book.volumeInfo.description) &&
    Boolean(book.volumeInfo.imageLinks) &&
    Boolean(book.volumeInfo.authors?.length)
  );
};

const getGoogleBooks = async ({
  q,
  maxResults,
  language,
  startIndex,
}: {
  q: string;
  maxResults: number;
  language: string;
  startIndex: number;
}) => {
  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.searchParams.set('q', `intitle:${q}`);
  url.searchParams.set('startIndex', startIndex.toString());
  url.searchParams.set('maxResults', maxResults.toString());
  url.searchParams.set('langRestrict', language);
  url.searchParams.set('printType', 'books');

  const urlStr = url.toString();

  const { data } = await axios.get<GoogleBooksApiResponse>(urlStr);

  return data;
};

export const getAllBooks = async ({ q, language }: { q: string; language: string }) => {
  const books: GoogleApiVolume[] = [];
  const MAX_RESULTS = 40;

  // Initial fetch
  const initialData = await getGoogleBooks({ q, language, maxResults: MAX_RESULTS, startIndex: 0 });

  const { totalItems, items: initialItems } = initialData;

  logger.info(`Google API has ${totalItems} items for q:${q} and language:${language}`);

  // Add the initial batch of items
  if (initialItems) books.push(...initialItems);

  // Calculate remaining items and required API calls
  const itemsLeft = totalItems - MAX_RESULTS;
  if (itemsLeft <= 0) {
    return books; // No more items to fetch
  }

  const callsLeft = Math.ceil(itemsLeft / MAX_RESULTS);

  const offsets = Array.from({ length: callsLeft }, (_, i) => MAX_RESULTS * (i + 1));

  // Fetch remaining items concurrently
  const results = await Promise.all(
    offsets.map((offset) => getGoogleBooks({ q, language, maxResults: MAX_RESULTS, startIndex: offset }))
  );

  // Add the fetched items to the books array
  results.forEach((result) => {
    if (result.items) books.push(...result.items);
  });

  return books;
};

export const mapGoogleToBL = (googleBook: GoogleApiVolumeWithCompleteInfo): BLBook => {
  const { volumeInfo, id } = googleBook;
  return {
    author: volumeInfo.authors[0],
    coverUrl: volumeInfo.imageLinks.smallThumbnail || volumeInfo.imageLinks.thumbnail,
    description: volumeInfo.description,
    id,
    language: volumeInfo.language,
    title: volumeInfo.title,
  };
};
