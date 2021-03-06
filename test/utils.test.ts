import { get_label_names, get_assignee_logins } from '../src/utils';
import payload from './fixtures/issue.json';

describe('utils', () => {
  test('get_label_names', () => {
    // Run the test.
    let result = get_label_names(payload.issue.labels);

    // Check the result.
    let expected = new Set(['enhancement', 'frontend']);
    expect(result).toEqual(expected);
  });

  test('get_assignee_logins', () => {
    // Run the test.
    let result = get_assignee_logins(payload.issue.assignees);

    // Check the result.
    let expected = new Set(['alice', 'bob']);
    expect(result).toEqual(expected);
  });
});
