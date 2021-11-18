import { Labels, Assignees, LabelNames, AssigneeLogins } from './types';

export function get_label_names(labels: Labels): LabelNames {
  /*
   * Extract label names from label objects.
   */
  return new Set(labels.map((label: Labels[number]) => label.name));
}

export function get_assignee_logins(assignees: Assignees): AssigneeLogins {
  /*
   * Extract assignee logins from assignee objects.
   */
  return new Set(assignees.map((assignee: Assignees[number]) => assignee.login));
}
