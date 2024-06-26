import { MOCK_MESSAGE } from '@mocks/common';
import helloService from './hello.service';

const mockGetMessage = jest.fn().mockReturnValue(MOCK_MESSAGE);

jest.mock('@libs/repositories', () => {
  return {
    HelloRepository: jest.fn().mockReturnValue({
      getMessage: () => mockGetMessage(),
    }),
  };
});

describe('Hello service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get message', () => {
    test('GIVEN the createBlob method WHEN it is called with the correct payload THEN the blob is created', async () => {
      const res = helloService.getMessage();
      expect(res).toBe(MOCK_MESSAGE);
    });
  });
});
