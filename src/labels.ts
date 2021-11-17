import { LabelNames } from './types';
import { Context } from 'probot';

export async function add(context: Context, labels: LabelNames): Promise<void> {
  /*
   * Add a set of labels to the current issue.
   */
  // Exit early.
  if (labels.size == 0) {
    return;
  }

  // Upload the labels.
  const issue = context.issue({ labels: Array.from(labels) });
  await context.octokit.issues.addLabels(issue);
}
