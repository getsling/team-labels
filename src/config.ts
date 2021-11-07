import { Context } from 'probot'
import { Set } from "set";

// Path of the app configuration.
const PATH = 'team_labels.yml';
export interface Config { [key: string]: string[] };


export async function get_labels(context: Context): Promise<Set<string>> {
  /*
   * Get a set of valid labels.
   */
  // Get a list of labels for the repo.
  const repo = context.repo();
  const labels = await context.octokit.rest.issues.listLabelsForRepo(repo);

  // Construct a set out of the names.
  return Set(labels.map(label => label.name));
}


export async function parse(context: Context): Promise<void> {
 /*
   * Parse the configuration and return a list of labels to apply.
   */
  // Get valid labels.
  const repo_labels = await get_labels(context) as Config;

  // Read the configuration.
  const config = (await context.config(PATH));
  if (!config) {
    throw new Error('could not load config');
  }

  // Check the config for valid and invalid labels.
  var config_labels = new Set(Object.keys(config).keys);
  var valid = config_labels.intersect(repo_labels);
  var invalid = config_labels.difference(repo_labels);

  // Log the invalid labels.
  context.log(`Unknown labels in config: ${invalid.join(', ')}`)
}
