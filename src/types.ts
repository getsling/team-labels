import { Endpoints } from '@octokit/types';

export type Issue =
  Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data'];
export type Pull = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}']['response']['data'];
export type Payload = Issue | Pull;

export type Labels = Endpoints['GET /repos/{owner}/{repo}/labels']['response']['data'];
export type Assignees = Endpoints['GET /repos/{owner}/{repo}/assignees']['response']['data'];

export type LabelNames = Set<string>;
export type AssigneeLogins = Set<string>;

export type ConfigFile = { [key: string]: string[] };
export type Config = { [key: string]: Set<string> };
