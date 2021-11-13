import { Labels, Assignees, LabelNames, AssigneeLogins } from './types';

export function get_label_names(labels: Labels): LabelNames {
  /*
   * Extract label names from label objects.
   */
  return new Set(labels.map((label) => label.name));
}

export function get_assignee_logins(assignees: Assignees): AssigneeLogins {
  /*
   * Extract assignee logins from assignee objects.
   */
  return new Set(assignees.map((assignee) => assignee.login));
}
