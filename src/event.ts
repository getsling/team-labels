import { LabelNames, Payload, Config } from './types';
import { get_assignee_logins, get_label_names } from './utils';
import { union, difference } from './set';

export async function get_new_labels(payload: Payload, config: Config): Promise<LabelNames> {
  /*
   * Get a set of new labels for the issue.
   */
  // Determine which labels need to be added.
  let new_labels = new Set();
  let assignees = get_assignee_logins(payload.assignees);
  for (let assignee of Array.from(assignees)) {
    new_labels = union(new_labels, config[assignee] || new Set());
  }

  // Remove any existing labels.
  let labels = get_label_names(payload.labels);
  return difference(new_labels, labels);
}
