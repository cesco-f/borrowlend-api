interface GoogleApiVolumeInfo {
  title: string;
  authors?: string[];
  categories: string[];
  language: string;
  description?: string;
  imageLinks?: { smallThumbnail: string; thumbnail: string };
}

interface GoogleApiVolumeCompleteInfo extends GoogleApiVolumeInfo {
  description: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  authors: string[];
}

export interface GoogleApiVolume {
  kind: string;
  id: string;
  etag: string;
  volumeInfo: GoogleApiVolumeInfo;
}

export interface GoogleApiVolumeWithCompleteInfo extends GoogleApiVolume {
  volumeInfo: GoogleApiVolumeCompleteInfo;
}

export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items: GoogleApiVolume[];
}

export interface BLBook {
  id: string;
  author: string;
  coverUrl: string;
  description: string;
  language: string;
  title: string;
}
