import { mockGetMessage, MOCK_NAME } from '@mocks/hello';
import { mockLambdaEvent } from '@mocks/common';
import { publicHandler, privateHandler } from './handlers';

jest.mock('@libs/services/index', () => ({
  helloService: {
    getMessage: () => mockGetMessage(),
  },
}));

const runCommonTests = (handler: any) => {
  test('GIVEN a valid body WHEN calling the hello handler THEN 200 is returned', async () => {
    const event = mockLambdaEvent({ body: { name: MOCK_NAME } });
    const res = await handler(event);

    expect(res.statusCode).toBe(200);
  });

  test('GIVEN an invalid body WHEN calling the hello handler THEN 400 is returned', async () => {
    const event = mockLambdaEvent({ body: {} });
    const res = await handler(event);

    expect(res.statusCode).toBe(400);
  });
};

describe('Hello', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Public', () => {
    runCommonTests(publicHandler);
  });

  describe('Private', () => {
    runCommonTests(privateHandler);
  });
});
