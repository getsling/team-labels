import { LabelNames, Labels, Assignees, Config } from './types';
import { get_assignee_logins, get_label_names } from './utils';
import { union, difference } from './set';
import { Context } from 'probot';

export function get_new_labels(assignees: Assignees, labels: Labels, config: Config): LabelNames {
  /*
   * Get a set of new labels for the issue.
   */
  // Determine which labels need to be added.
  let new_labels = new Set();
  for (let assignee of Array.from(get_assignee_logins(assignees))) {
    new_labels = union(new_labels, config[assignee] ?? new Set());
  }

  // Remove any existing labels.
  return difference(new_labels, get_label_names(labels));
}

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
