# team-labels

A GitHub App built with [Probot](https://github.com/probot/probot) that adds
labels to issues and PRs based on the assignee.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t team-labels .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> team-labels
```

## Pre-commit Hooks

This repo uses pre-commit hooks to validate its contents. First
[install](https://pre-commit.com/#installation) pre-commit. Then
[install](https://pre-commit.com/#3-install-the-git-hook-scripts) the scripts in
the root folder of this repo.

## License

[ISC](LICENSE) © 2021 Sling <admin@getsling.com>
