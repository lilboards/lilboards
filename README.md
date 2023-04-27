<div align="center">
  <a href="https://lilboards.org/">
    <img src="public/logo.svg" alt="Lilboards">
  </a>
  <p><strong>Create boards, columns, and items.</strong></p>
  <p>
    <a href="https://github.com/lilboards/lilboards/releases">
      <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/lilboards/lilboards">
    </a>
    <a href="https://github.com/lilboards/lilboards/actions/workflows/build.yml">
      <img src="https://github.com/lilboards/lilboards/actions/workflows/build.yml/badge.svg" alt="Lilboards build status badge">
    </a>
    <a href="https://codecov.io/gh/lilboards/lilboards">
      <img src="https://codecov.io/gh/lilboards/lilboards/branch/master/graph/badge.svg?token=G6U7W4ZJUN" alt="Codecov coverage status">
    </a>
  </p>
</div>

## Try It

Go to [lilboards.org](https://lilboards.org/) to create boards, columns, and items.

This project is built with:

- [Create React App](https://create-react-app.dev/)
- [Firebase](https://firebase.google.com/)
- [MUI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [nvm](https://github.com/nvm-sh/nvm)
- [Yarn 1](https://classic.yarnpkg.com/)

## Install

Clone the repository:

```sh
git clone https://github.com/lilboards/lilboards.git
cd lilboards
```

Use Node.js version:

```sh
nvm use
```

Install the dependencies:

```sh
yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn firebase:emulators`

Starts the [Firebase Emulators](https://firebase.google.com/docs/rules/emulator-setup).

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

If you get the error:

```
Could not start Database Emulator, port taken.
```

Then run:

```sh
kill $(lsof -ti :9000) && yarn firebase:emulators
```

Or replace port `9000` with a different port (e.g., `9001`) in `.env` and `firebase.json`.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn cypress:open`

Opens [Cypress](https://www.cypress.io/) for E2E (end-to-end) testing.

## Assets

[Logo](https://excalidraw.com/#json=5123776568098816,InQI3in09fDMlrMULQDmSQ)

## License

[MIT](LICENSE)
