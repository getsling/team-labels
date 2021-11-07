export const EVENT = {
  id: '1',
  name: 'issue',
  payload: {
    action: 'assigned',
    number: '1',
    pull_request: {
      number: '1',
      title: 'test',
      user: {
        login: 'creator',
      },
    },
    repository: {
      name: 'team-labels',
      owner: {
        login: 'owner',
      },
    },
  },
  draft: false,
};


export const CONFIG = {
  frontend: [
    'alice',
    'bob'
  ],
  backend: [
    'bob',
    'malory',
  ],
};
