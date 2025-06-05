import { formatDateToDDMMYYYY } from '../formatDate';

describe('formatDateToDDMMYYYY', () => {
  test('formats date string correctly', () => {
    const input = new Date(2025, 0, 10);
    const output = formatDateToDDMMYYYY(input);
    expect(output).toBe('10/01/2025');
  });
});