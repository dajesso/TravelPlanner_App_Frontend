import { formatDateToDDMMYYYY } from '../src/utils/formatDate';

describe('formatDateToDDMMYYYY', () => {
  test('formats date string correctly', () => {
    const input = '2025-01-10';
    const output = formatDateToDDMMYYYY(input);
    expect(output).toBe('10/01/2025');
  });
});