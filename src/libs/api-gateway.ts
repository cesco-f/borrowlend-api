export const formatJSONResponse = (status: number, response: Record<string, unknown>) => ({
  statusCode: status,
  body: JSON.stringify(response),
});
