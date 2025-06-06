import { deleteExpense } from "../src/utils/fetchApi";
import { getToken } from '../src/utils/getToken';

jest.mock('../src/utils/getToken', () => ({
  getToken: jest.fn(() => 'mocked-token')
}));

describe('deleteExpense', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

test('sends DELETE request and returns parsed response', async () => {
    const mockResponse = { message: 'Deleted successfully' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await deleteExpense('abc123');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/expenses/abc123',
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer mocked-token',
        },
      }
    );

    expect(result).toEqual({ ok: true, data: mockResponse });
  });
});