# Contributing

<details>
<summary>Table of Contents</summary>

- [Fork](#fork)
- [Install](#install)
- [Develop](#develop)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm run firebase:emulators`](#npm-run-firebaseemulators)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
  - [`npm run lint`](#npm-run-lint)
  - [`npm run cypress:open`](#npm-run-cypressopen)
- [Release](#release)

</details>

Pull requests are welcome! By participating in this project, you
agree to abide by our [code of conduct](https://github.com/lilboards/.github/blob/master/CODE_OF_CONDUCT.md).

## Fork

[Fork](https://github.com/lilboards/lilboards/fork) and then clone the repository:

```sh
# replace <USER> with your username
git clone git@github.com:<USER>/lilboards.git
```

```sh
cd lilboards
```

## Install

Set the Node.js version with [nvm](https://github.com/nvm-sh/nvm#intro):

```sh
nvm use
```

Install the dependencies:

```sh
npm install
```

## Develop

Make your changes, add tests/documentation, and ensure tests and lint pass:

```sh
npm run test:ci
```

```sh
npm run lint:fix
```

Write a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes

The commit message will be linted during the pre-commit Git hook.
To manually lint the most recent commit message:

```sh
git log -1 --pretty=format:"%s" | npx commitlint
```

Push to your fork and create a [pull request](https://github.com/lilboards/lilboards/compare/).

At this point, wait for us to review your pull request. We'll try to review pull requests within
1-3 business days. We may suggest changes, improvements, and/or alternatives.

Things that will improve the chance that your pull request will be accepted:

- [ ] Write tests that pass [CI](https://github.com/lilboards/lilboards/actions/workflows/build.yml).
- [ ] Write good documentation.
- [ ] Write a good [commit message](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run firebase:emulators`

Starts the [Firebase Emulators](https://firebase.google.com/docs/rules/emulator-setup).

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

If you get the error:

```
Could not start Database Emulator, port taken.
```

Then run:

```sh
kill $(lsof -ti :9000) && npm run firebase:emulators
```

Or replace port `9000` with a different port (e.g., `9001`) in `.env` and `firebase.json`.

### `npm test`

Launches the test runner in the interactive watch mode:

```sh
npm test
```

Run tests with coverage:

```sh
npm run test:ci
```

View the coverage report in your browser:

```sh
open coverage/lcov-report/index.html
```

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### `npm run lint`

Lints the codebase for ESLint errors:

```sh
npm run lint
```

Fix lint errors:

```sh
npm run lint:fix
```

Check types:

```sh
npm run lint:tsc
```

### `npm run cypress:open`

Opens [Cypress](https://www.cypress.io/) for E2E (end-to-end) testing.

If you get the error:

```
We attempted to make an http request to this URL but the request failed without a response.

We received this error at the network level:

  > Error: connect ECONNREFUSED 127.0.0.1:5173
```

Then expose the Vite server:

```sh
npx vite --host
```

## Release

Release is automated with [Release Please](https://github.com/googleapis/release-please).
