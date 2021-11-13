import { Context } from 'probot'
import event from "./fixtures/event.json";
import payload from "./fixtures/issues.assigned.json";
import config from "./fixtures/config.json";
import { get_valid_labels, parse } from '../src/config'


describe('config', () => {
  let context: Context;

  beforeEach(async () => {
    // Create a mock context.
    event.payload = payload as any;
    context = new Context(event as any, {} as any, {} as any);
    context.config = jest.fn().mockImplementation(async () => config);
    context.log = jest.fn() as any;

    // Mock the API.
    let response = {
      data: [
        {'name': 'bug'},
        {'name': 'enhancement'},
        {'name': 'frontend'}
      ]
    };
    context.octokit.issues = {
      listLabelsForRepo: jest.fn().mockImplementation(async () => response),
    } as any;
  })

  test('get_valid_labels returns a set of labels', async () => {
    // Run the test.
    let result = await get_valid_labels(context);

    // Check the result.
    let expected = new Set(['bug', 'enhancement', 'frontend']);
    expect(result).toEqual(expected);
  })

  test('parse reports unknown labels', async () => {
    // Monitor the log.
    const spy = jest.spyOn(context, 'log');

    // Run the test.
    await parse(context);

    // Check the result.
    let expected = 'Unknown labels in config: backend';
    expect(spy.mock.calls[0][0]).toEqual(expected);
  })
})
