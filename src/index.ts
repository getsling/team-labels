const { run } = require('@probot/adapter-github-actions');
import { app } from './app';

run(app).catch((error: any) => {
  console.error(error);
  process.exit(1);
});
