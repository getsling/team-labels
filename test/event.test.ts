import { get_new_labels } from '../src/event';
import { Config } from '../src/types';
import issue from './fixtures/issue.json';

describe('event', () => {
  const config: Config = {
    alice: new Set(['frontend']),
    bob: new Set(['frontend', 'full stack'])
  };

  test.each([
    ['assignees and labels', issue.assignees, issue.labels, new Set(['full stack'])],
    ['labels only', [], issue.labels, new Set()],
    ['assignees only', issue.assignees, [], new Set(['frontend', 'full stack'])]
  ])('get_new_labels with %s', (name, assignees, labels, expected) => {
    // Suppress the undefined name.
    expect(name);

    // Run the test.
    let result = get_new_labels(assignees, labels, config);

    // Check the result.
    expect(result).toEqual(expected);
  });
});
