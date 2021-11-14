import { NO_CONFIG, get_valid_labels, parse } from '../src/config';
import config from './fixtures/config.json';
import event from './fixtures/event.json';
import payload from './fixtures/pull_request.json';
import labels from './fixtures/repo.labels.json';
import { Context } from 'probot';

describe('config', () => {
  let context: Context;

  beforeEach(async () => {
    // Create a mock context.
    event.payload = payload as any;
    context = new Context(event as any, {} as any, {} as any);
    context.config = jest.fn().mockImplementation(async () => config);
    context.log = jest.fn() as any;

    // Mock the API.
    let response = { data: labels };
    context.octokit.issues = {
      listLabelsForRepo: jest.fn().mockImplementation(async () => response)
    } as any;
  });

  test('throws an error if no config provided', async () => {
    // Setup the test.
    let no_config = async () => {
      throw new Error(NO_CONFIG);
    };
    context.config = jest.fn().mockImplementation(no_config);

    // Run the test and check the result.
    let parser = async () => await parse(context);
    await expect(parser).rejects.toThrowError(NO_CONFIG);
  });

  test('get_valid_labels returns a set of labels', async () => {
    // Run the test.
    let result = await get_valid_labels(context);

    // Check the result.
    let expected = new Set(['bug', 'enhancement', 'frontend', 'full stack']);
    expect(result).toEqual(expected);
  });

  test('parse reports unknown labels', async () => {
    // Monitor the log.
    const spy = jest.spyOn(context, 'log');

    // Run the test.
    await parse(context);

    // Check the result.
    let expected = 'Unknown labels in config: backend';
    expect(spy.mock.calls[0][0]).toEqual(expected);
  });

  test('parse returns a valid config', async () => {
    // Run the test.
    let result = await parse(context);

    // Check the result.
    let expected = {
      alice: new Set(['frontend']),
      bob: new Set(['frontend', 'full stack'])
    };
    expect(result).toEqual(expected);
  });
});
