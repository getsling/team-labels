import { Context } from 'probot'
import { LabelNames, Config } from './types'
import { get_label_names } from './utils'

// Path of the app configuration.
const PATH = 'team_labels.yml';


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


export async function parse(context: Context): Promise<void> {
 /*
   * Parse the configuration and return a list of labels to apply.
   */
  // Get valid labels and assignees.
  const repo_labels = await get_valid_labels(context);

  // Read the configuration.
  const config = (await context.config(PATH)) as Config;
  if (!config) {
    throw new Error('could not load config');
  }

  // Check the config.
  let config_labels = Object.keys(config);
  //let valid = new Set([...config_labels].filter(x => repo_labels.has(x)));
  let invalid = new Set([...config_labels].filter(x => !repo_labels.has(x)));

  // Log the invalid labels.
  if (invalid.size > 0) {
    context.log(`Unknown labels in config: ${Array.from(invalid).join(', ')}`)
  }

  // Don't add a label if it already exists.
}
