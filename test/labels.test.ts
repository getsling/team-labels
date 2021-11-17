import { add } from '../src/labels';
import { Context } from 'probot';

describe('labels', () => {
  let context: Context;

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

  test('labels are added', async () => {
    // Monitor the log.
    const spy = jest.spyOn(context.octokit.issues, 'addLabels');

    // Run the test.
    let labels = new Set(['frontend', 'full stack']);
    await add(context, labels);

    // Check the result.
    let expected = { labels: Array.from(labels) };
    expect(spy.mock.calls[0][0]).toEqual(expected);
  });
});
