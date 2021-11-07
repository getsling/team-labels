import { Context } from 'probot'

// Path of the app configuration.
const PATH = 'team_labels.yml';
export interface Config { [key: string]: string[] };


export async function get_labels(context: Context): Promise<Set<string>> {
  /*
   * Get a set of valid labels.
   */
  // Get a list of labels for the repo.
  const repo = context.repo();
  const response = await context.octokit.rest.issues.listLabelsForRepo(repo);

  // Construct a set out of the names.
  return new Set(response.data.map(label => label.name));
}


export async function parse(context: Context): Promise<void> {
 /*
   * Parse the configuration and return a list of labels to apply.
   */
  // Get valid labels.
  const repo_labels = await get_labels(context);

  // Read the configuration.
  const config = (await context.config(PATH)) as Config;
  if (!config) {
    throw new Error('could not load config');
  }

  // Check the config.
  var config_labels = Object.keys(config);
  //var valid = new Set([...config_labels].filter(x => repo_labels.has(x)));
  var invalid = new Set([...config_labels].filter(x => !repo_labels.has(x)));

  // Log the invalid labels.
  if (invalid.size > 0) {
    context.log(`Unknown labels in config: ${Array.from(invalid).join(', ')}`)
  }
}
