import app from '../src/app';
import issue_payload from './fixtures/issue.json';
import pull_request_payload from './fixtures/pull_request.json';
import nock from 'nock';
import labels from './fixtures/repo.labels.json';
import { Probot, ProbotOctokit } from 'probot';

const fs = require('fs');
const path = require('path');
const private_key = fs.readFileSync(path.join(__dirname, 'fixtures/mock-cert.pem'), 'utf-8');
const app_yml = fs.readFileSync(path.join(__dirname, 'fixtures/config.yml'), 'utf-8');

describe('index', () => {
  let probot: any;

  beforeEach(() => {
    // Nock is used to simulate github.
    nock.disableNetConnect();

    // Create a probot instance to run the app.
    probot = new Probot({
      appId: 1,
      privateKey: private_key,
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false }
      })
    });

    // Load our app into probot.
    probot.load(app);
  });

  test('handle issues', async (done) => {
    // Setup the github mock.
    const mock = nock('https://api.github.com')
      // Respond with the app token.
      .post('/app/installations/1/access_tokens')
      .reply(200, {
        token: 'test',
        permissions: {
          issues: 'write'
        }
      })
      // Respond with repo labels.
      .get('/repos/octocat/octocat/labels?per_page=100&page=1')
      .reply(200, labels)
      // Respond with the app configuration.
      .get('/repos/octocat/octocat/contents/.github%2Fteam_labels.yml')
      .reply(200, app_yml)
      // The app will respond with the new labels.
      .post('/repos/octocat/octocat/issues/1/labels', (body: any) => {
        done(expect(body).toMatchObject({ labels: ['full stack'] }));
        return true;
      })
      .reply(200);

    // Trip the webhook with the payload to start interacting with the mock.
    await probot.receive({ name: 'issues', payload: issue_payload });

    // Ensure nothing else is pending.
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  test('handle pull_requests', async () => {
    // Setup the github mock.
    const mock = nock('https://api.github.com')
      // Respond with the app token.
      .post('/app/installations/1/access_tokens')
      .reply(200, {
        token: 'test',
        permissions: {
          issues: 'write'
        }
      })
      // Respond with repo labels.
      .get('/repos/octocat/octocat/labels?per_page=100&page=1')
      .reply(200, labels)
      // Respond with the app configuration.
      .get('/repos/octocat/octocat/contents/.github%2Fteam_labels.yml')
      .reply(200, app_yml);

    // Trip the webhook with the payload to start interacting with the mock.
    await probot.receive({ name: 'pull_request', payload: pull_request_payload });

    // Ensure nothing else is pending.
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
