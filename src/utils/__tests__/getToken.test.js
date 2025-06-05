import { getToken } from '../getToken'

Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'sessionToken=panic123'
});

test('retrieve sessionToken from cookie', () => {
    expect(getToken()).toBe('panic123');
})