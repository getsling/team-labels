import { Endpoints } from "@octokit/types";

export type Labels = Endpoints["GET /repos/{owner}/{repo}/labels"]["response"]["data"];
export type Assignees = Endpoints["GET /repos/{owner}/{repo}/assignees"]["response"]["data"];

export type LabelNames = Set<string>;
export type AssigneeLogins = Set<string>;

export type Config = { [key: string]: string[] };
export type UserToLabels = { [key: string]: Set<string> };
