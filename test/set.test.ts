import { union, intersection, difference } from '../src/set';

describe('set', () => {
  let a = new Set([1, 2, 3]);
  let b = new Set([2, 3, 4]);

  test('a ∪ b', () => {
    // Run the test.
    let result = union(a, b);

    // Check the result.
    let expected = new Set([1, 2, 3, 4]);
    expect(result).toEqual(expected);
  });

  test('a ∩ b', () => {
    // Run the test.
    let result = intersection(a, b);

    // Check the result.
    let expected = new Set([2, 3]);
    expect(result).toEqual(expected);
  });

  test('a - b', () => {
    // Run the test.
    let result = difference(a, b);

    // Check the result.
    let expected = new Set([1]);
    expect(result).toEqual(expected);
  });
});
