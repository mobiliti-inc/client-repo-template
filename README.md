# core-admin-ui

Core admin UI app

## Technologies

- React
- TypeScript
- Storybook
- React Router
- Jest (js unit testing)
- Enzyme (React unit testing)
- eslint
- CSS Modules
- SCSS
- Webpack

## Scripts

### Installation

_Please note this is intended to run on Node 10.x_

```bash
sh ./setup.sh
```

### JS/React Testing

`npm test`

### Linting

`npm run lint`

### Pre-commit hooks

There is a pre-commit hook (setup in the `setup.sh` file) that will lint and unit test the code. To skip this for incremental commits, use:<br>
`git commit [arguments] --no-verify`

### Updating snapshots

The test command is written to update snapshots automatically

`npm test`

## Coding Guidelines

[Coding Guidelines](/coding-guidelines.md)
