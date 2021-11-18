import { add, get_new_labels } from '../src/labels';
import { Context } from 'probot';
import { Config } from '../src/types';
import payload from './fixtures/issue.json';

describe('labels', () => {
  let context: Context;
  const config: Config = {
    alice: new Set(['frontend']),
    bob: new Set(['frontend', 'full stack'])
  };

  beforeEach(async () => {
    // Create a mock context.
    context = new Context({} as any, {} as any, {} as any);

    // Mock the API.
    // This mock isn't 100% accurate as the real function will append other
    // parameters, but this mock is good enough for the test.
    context.issue = jest.fn((data) => data) as any;
    context.octokit.issues = {
      addLabels: jest.fn()
    } as any;
  });

  test.each([
    [
      'assignees and labels',
      payload.issue.assignees,
      payload.issue.labels,
      new Set(['full stack'])
    ],
    ['labels only', [], payload.issue.labels, new Set()],
    ['assignees only', payload.issue.assignees, [], new Set(['frontend', 'full stack'])]
  ])('get_new_labels with %s', (name, assignees, labels, expected) => {
    // Suppress the undefined name.
    expect(name);

    // Run the test.
    let result = get_new_labels(assignees, labels, config);

    // Check the result.
    expect(result).toEqual(expected);
  });

  test('labels are added', async () => {
    // Monitor addLabels.
    const spy = jest.spyOn(context.octokit.issues, 'addLabels');

    // Run the test.
    let labels = new Set(['frontend', 'full stack']);
    await add(context, labels);

    // Check the result.
    let expected = { labels: Array.from(labels) };
    expect(spy.mock.calls[0][0]).toEqual(expected);
  });

  test('add exits early', async () => {
    // Monitor addLabels.
    const spy = jest.spyOn(context.octokit.issues, 'addLabels');

    // Run the test.
    let labels = new Set([]);
    await add(context, labels);

    // Check the result.
    expect(spy.mock.calls.length).toEqual(0);
  });
});
