import { parse } from './config';
import { add, get_new_labels } from './labels';
import { Context } from 'probot';
import { Probot } from 'probot';

async function handle(context: Context): Promise<void> {
  /*
   * Add labels to an event.
   */
  // Parse the config.
  let config = await parse(context);

  // Get the existing assignees and labels.
  let target = context.payload.issue ?? context.payload.pull_request;
  let assignees = target.assignees ?? [];
  let labels = target.labels ?? [];

  // Add the new labels.
  await add(context, get_new_labels(assignees, labels, config));
}

export function app(app: Probot) {
  /*
   * Register the handlers.
   */
  app.on('issues.assigned', handle);
  app.on('pull_request.assigned', handle);
}
