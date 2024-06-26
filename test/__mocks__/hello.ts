import { MOCK_MESSAGE } from './common';

export const MOCK_NAME = 'MOCK_NAME';

// MOCK HELLO SERVICE
export const mockGetMessage = jest.fn().mockReturnValue(MOCK_MESSAGE);
