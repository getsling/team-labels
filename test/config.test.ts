import { Context } from 'probot'
import { EVENT, CONFIG } from './data'
import { get_labels } from '../src/config'


describe('config', () => {
  let context: Context;

  beforeEach(async () => {
    // Create a mock context.
    context = new Context(JSON.parse(JSON.stringify(EVENT)) as any, {} as any, {} as any);
    context.config = jest.fn().mockImplementation(async () => JSON.parse(JSON.stringify(CONFIG)));
    context.log = jest.fn() as any;
  })

  test('get_labels returns a set of labels', async () => {
    // Setup fake data.
    let response = {
      data: [
        {'name': 'bug'},
        {'name': 'enhancement'}
      ]
    };
    context.octokit.issues = {
      listLabelsForRepo: jest.fn().mockImplementation(async () => response),
    } as any;

    // Run the test.
    let result = await get_labels(context);

    // Check the result.
    let expected = new Set(['bug', 'enhancement']);
    expect(result).toEqual(expected);
  })
})
