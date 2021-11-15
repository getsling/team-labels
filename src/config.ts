import { LabelNames, ConfigFile, Config } from './types';
import { get_label_names } from './utils';
import { intersection, difference } from './set';
import { Context } from 'probot';

// Path of the app configuration.
const PATH = 'team_labels.yml';
export const NO_CONFIG = 'could not load config';

export async function get_valid_labels(context: Context): Promise<LabelNames> {
  /*
   * Get a set of valid labels.
   */
  // Get a list of labels for the repo.
  const repo = context.repo();
  const response = await context.octokit.issues.listLabelsForRepo(repo);

  // Construct a set out of the names.
  return get_label_names(response.data);
}

export async function parse(context: Context): Promise<Config> {
  /*
   * Parse the configuration and return a map of users to the labels required
   * per user.
   */
  // Get valid labels and assignees.
  const repo_labels = await get_valid_labels(context);

  // Read the configuration.
  const config = (await context.config(PATH)) as ConfigFile;
  if (!config) {
    throw new Error(NO_CONFIG);
  }

  // Validate the config.
  let config_labels = new Set(Object.keys(config));
  let valid = intersection(config_labels, repo_labels);
  let invalid = difference(config_labels, repo_labels);

  // Log the invalid labels.
  if (invalid.size > 0) {
    context.log(`Unknown labels in config: ${Array.from(invalid).join(', ')}`);
  }

  // Invert the mapping of the config for easy lookup.
  let result: Config = {};
  for (let label of Array.from(valid)) {
    for (let user of config[label]) {
      // Create an empty set.
      if (!(user in result)) {
        result[user] = new Set();
      }

      // Add the label.
      result[user].add(label);
    }
  }

  return result;
}
