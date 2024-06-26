![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

# REST API Serverless Template

Eolas REST API Serverless Template on AWS.

## Features

- [x] Supports lambda functions.
- [x] Uses serverless to deploy in development and production AWS accounts.
- [x] Supports middlewares created by exploiting the power of [Middy](https://github.com/middyjs/middy).
- [x] Supports unit tests and integration tests using jest.
- [x] Supports e2e tests using newman.
- [x] Uses a semantic release external project to handle releases.

## Basic Configuration

These are the configurations you'll have to set in your forked project:

| Name               | Location                                 | Description              |
|--------------------|------------------------------------------|--------------------------|
| `basePath` | *serverles.yml* (*`custom.basePath`*)            | Desired custom path.     |
| `name` | *package.json*                           | Name of your service.    |

Although is not strictly required, you will probably want to change the environment domains in your postman environment so tests runs correctly.

## Pipeline Configuration
The following variables need to be set.

| Name               | Location | Description | Required |
|--------------------|-------------|-------------|-------------|
| `GITLAB_TOKEN` | Gitlab CI/CD vars| Gitlab user credentials. | true |
| `AWS_CREDS` | Gitlab CI/CD Vars| Aws deployment user credentials in base64. | true |
| `SLACK_WEBHOOK` | Gitlab CI/CD Vars| Webhook for Slack. | true |

## Pipeline

- **Feature branch**: lint, unit tests, deploy alias, e2e alias, delete alias.

- **Development branch**: lint, unit tests, deploy to development, e2e development, deploy to staging, e2e staging.

- **Main branch**: lint, manual deploy to production.

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/hydrogen (v18.17.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

This project uses *yarn* as package manager configured for zero installs, meaning that all dependencies are already
available in the repository. 

Yarn configuration also manage automatically the connection to our CodeArtifact repository, only requirement to have
a **development** profile defined in the AWS configuration.

## Other commands
To start locally the server:

```console
yarn start
```

To format the code:
```console
yarn format
```

To fix lint problems:
```console
yarn lint:fix
```

To run tests:
```console
yarn test:unit

yarn test:unit:watch

yarn test:coverage
```

## Automated Tests

We have included in this project a Postman suite, containing environment files for local, dev and prod as well as a main
postman collection which is used also together Newman to run E2E tests on the pipelines. 
Within this project you will find a *package.json* script named *e2e:local* which you can run in order to execute a test suite locally if the server is running locally.


### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
📦rest-api-template
 ┣ 📂docs
 ┃ ┗ 📜openapi-description.yml
 ┣ 📂src
 ┃ ┣ 📂functions
 ┃ ┃ ┣ 📂forcedError
 ┃ ┃ ┃ ┣ 📜handler.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂hello
 ┃ ┃ ┃ ┣ 📜handler.ts
 ┃ ┃ ┃ ┣ 📜hello.repository.ts
 ┃ ┃ ┃ ┣ 📜hello.service.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜schema.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂libs
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┗ 📜custom-middleware.ts
 ┃ ┃ ┣ 📜api-gateway.ts
 ┃ ┃ ┣ 📜handler-resolver.ts
 ┃ ┃ ┗ 📜lambda.ts
 ┣ 📂test
 ┃ ┣ 📂jest
 ┃ ┃ ┣ 📜example-test.integration-spec.ts
 ┃ ┃ ┗ 📜exception-handling.integration-spec.ts
 ┃ ┗ 📂newman
 ┃ ┃ ┣ 📜development.postman_environment.json
 ┃ ┃ ┣ 📜local.postman_environment.json
 ┃ ┃ ┣ 📜production.postman_environment.json
 ┃ ┃ ┣ 📜rest-template.postman_collection.json
 ┃ ┃ ┗ 📜staging.postman_environment.json
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.gitlab-ci.yml
 ┣ 📜.npmrc
 ┣ 📜.nvmrc
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜CHANGELOG.md
 ┣ 📜README.md
 ┣ 📜jest-integration.json
 ┣ 📜jest.json
 ┣ 📜package.json
 ┣ 📜release.config.js
 ┣ 📜serverless.ts
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

### Custom Domain and Certificate Management

The custom domain used by this service in the API Gateway is managed by the serverless plugin 

```
sls create-cert --stage dev
```

```
sls create_domain --stage dev
```

## Semantic Release

This project is configured with automated semantic releasing:

- [x] Enforces [Semantic Versioning](https://semver.org/) specification.
- [x] Updates automatically project's CHANGELOG using commits information.
- [x] Adds back-merge of a release in the project's git repository.
- [x] Creates a Slack notification when a release has been published.

### Back-Merge

Thanks to this feature, all release git commits (which are only created in the *master* branch) will be sent automatically to the *beta* branch, so you don't have to manually rebase it later on.
This feature is done using [Saithodev/semantic-release-backmerge plugin](https://www.npmjs.com/package/@saithodev/semantic-release-backmerge)

### Commit format

Not really in the scope of this README, but I find helpful to have this description about the commit format:

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|dev-infra|docs-infra|migrations|
  │                          ngcc|ve
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

#### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests 


Not all commit types will trigger a release, find some examples in the table below: 

| Commit message                                                                                                                                                                    | Release Type                                                                                        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| fix(pencil): stop graphite breaking when too much pressure applied                                                                                                                | ~~Patch~~ Fix Release                                                                                   |
| feat(pencil): add 'graphiteWidth' option                                                                                                                                          | ~~Minor~~ Feature Release                                                                               |
| perf(pencil): remove graphiteWidth option <br /> BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reasons. | ~~Major~~ Breaking Release\  (Note that the BREAKING CHANGE: token must be in the footer of the commit) |

Commit messages with type _doc_ or _chore_ will not trigger any release. More information [here](https://semantic-release.gitbook.io/semantic-release).

