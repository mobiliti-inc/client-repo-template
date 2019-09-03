# core-admin-ui

## 🚗 Getting Started

```note
These instructions will get you a copy of the project up and running on
your local machine for development and testing purposes. And including
Project structure and coding standard, please review it seriously.
```

## 🔨 Prerequisites

- node >= 8.9.0
- TypeScript >= 3.0
- React >= 16.8.0
- Storybook
- React Router
- Jest (js unit testing)
- Enzyme (React unit testing)
- eslint
- CSS Modules
- SCSS
- Webpack

## 🔧 Development Tools

- [VS Code](https://code.visualstudio.com/)
- [Chrome](https://www.google.com/chrome/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US)
- [Node](https://nodejs.org/en/)

## 💨 Running the Project

### Using a Script

```bash
sh ./setup.sh
```

### Manually

**Install the packages**

`npm install` or `yarn install`

**Start the application**

`npm start` or `yarn start`

When the app is run in development mode. Open <http://localhost:3000> to view it in the browser. The page will reload if you make edits.

## ⚖️ JS/React Testing

```note
When you run tests, coverage will be generated automatically too.
```

`npm test`

### Watch mode

Watch mode allows to run tests as you make changes to project files

`npm test -w`

## 🔭 Linting

`npm run lint`

### Pre-commit hooks

There is a pre-commit hook (setup in the `setup.sh` file) that will lint and unit test the code. To skip this for incremental commits, use:<br>
`git commit [arguments] --no-verify`

### Updating snapshots

The test command is written to update snapshots automatically

`npm test`

## 📒 Coding Guidelines

[Coding Guidelines](/coding-guidelines.md)
