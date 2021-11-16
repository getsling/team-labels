import { get_new_labels } from '../src/event';
import { Config } from '../src/types';
//import pull_request from './fixtures/pull_request.json';
import issue from './fixtures/issue.json';

describe.each([
  ['issue', issue]
  //  ["pull_request", pull_request],
])('%s event', (name, payload) => {
  // A test configuration.
  const config: Config = {
    alice: new Set(['frontend']),
    bob: new Set(['frontend', 'full stack'])
  };

  test('get_new_labels', () => {
    // Run the test.
    console.log(name);
    let result = get_new_labels(payload, config);

    // Check the result.
    let expected = new Set(['enhancement', 'frontend']);
    expect(result).toEqual(expected);
  });
});
