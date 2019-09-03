# Mobiliti Front End Development Guidelines

**A guide to making handsome front end code for Mobiliti.**

## Technologies

1. [View Layer](#view-layer)
2. [Routing](#routing)
3. [State Management](#state-management)
4. [Testing Libraries](#testing)
5. [Code Quality](#code-quality)
6. [Code Compatibility](#code-compatibility)
7. [Styling](#styling)
8. [Bundler](#bundler)
9. [Error Logging](#error-logging)
10. [Version Control](#version-control)
11. [Deployment](#deployment)
12. [HTTP](#http)
13. [Middleware](#middleware)

## View Layer

- [React](https://reactjs.org/docs/getting-started.html)

  - "A Javascript library for building user interfaces"

## Routing

- Routing will be handled by [React Router](https://reacttraining.com/react-router/)

## State Management

- [Redux](https://redux.js.org/)

  - Management of application state will be handled on a case-by-case basis

    - Component Specific state will be handled in [component level state](https://reactjs.org/docs/faq-state.html)
    - Global state and api call results will be handled by [Redux](https://redux.js.org/)

  - Dependencies

    - [react-redux](https://github.com/reduxjs/react-redux) - react bindings for Redux

  - Development enhancements

    - [Redux Devtools](https://github.com/reduxjs/redux-devtools)

      - Allows you to view, rewind, and fast forward actions and resultant state
      - Use in conjunction with a Redux Devtools browser extension

        - [Redux Devtools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

  - Redux action types should be passed around as constants and not strings

    - Plain strings greatly increase likelihood for human error
    - Example action type:

      > const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS"

    - Good:

      > dispatch({ type: USER_FETCH_SUCCESS, data: {...} })

    - Bad:

      > dispatch({ type: "USER_FETCH_SUCCESS", data: {...} })

## Testing

- All tests will be run in a pre-commit hook and run again in Circle CI upon creation of a Pull Request

### Component Testing

- #### Unit Testing

  - Test functionality of individual pieces of logic
  - [Jest](http://jestjs.io/docs/en/getting-started)

- #### React Component Testing

  - Compare component structure to expected structure
  - [Enzyme](https://github.com/airbnb/enzyme)

- #### Snapshot Testing

  - Runs a headless browser to produce rendered output and tests for changes in visual appearance by comparing snapshot images
  - [Jest Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)

### Redux Testing

> [Testing Redux](https://redux.js.org/recipes/writing-tests)

> - Testing Action Creators

>   - Action creators should be tested to ensure that the correct action creator is called, and the correct action is returned
>   - Async Action Creator tests will use [Fetch Mock](https://github.com/wheresrhys/fetch-mock) to mock API responses
>   - The Redux store should also be mocked using [Redux Mock Store](https://github.com/dmitry-zaets/redux-mock-store)

> - Testing Reducers

>   - Reducers should be tested to ensure they are returning the correct state based on the action applied

> - Testing connected components

>   - [Enzyme](https://github.com/airbnb/enzyme)

>     - [Enzyme Adapter for React 16](https://github.com/airbnb/enzyme)

>   - If you need to test the component without the redux store then you can export undecorated component in addition to connected component

## Code Quality

- [TsLint](https://palantir.github.io/tslint/) will be run in a pre-commit hook.
- The application will be built in React adhering to the standards of the [React/JSX + TypeScript Style Guide](https://github.com/palantir/tslint-react) with a few exceptions:

  ```
  rules: {
    "no-var-keyword": true,
    "no-parameter-reassignment": true,
    "typedef": false,
    "readonly-keyword": false,
    "readonly-array": false,
    "no-let": false,
    "no-array-mutation": true,
    "no-use-before-declare": true,
    "radix": true,
    "switch-default": true,
    "triple-equals": [true, "allow-undefined-check", "allow-null-check"],
    "eofline": false,
    "indent": [true, "tabs"],
    "max-line-length": [true, 250],
    "no-trailing-whitespace": true,
    "trailing-comma": [
      true,
      {
        "multiline": "never",
        "singleline": "never"
      }
    ],
    "jsdoc-format": true,
    "no-consecutive-blank-lines": [true],
    "semicolon": [true, "always"],
    "object-literal-sort-keys": false,
    "no-empty": [true, "allow-empty-functions"]
  }
  ```

## Code Compatibility

- [Babel](https://babeljs.io/docs/en)

  - [babel-preset-react](https://babeljs.io/docs/en/babel-preset-react.html)

    - Turn tsx into javascript the browser can understand

  - [babel-preset-stage-3](https://babeljs.io/docs/en/babel-preset-stage-3.html)

    - Add features from ES2016 & ES2017

## Styling

- [React CSS Modules](https://github.com/gajus/react-css-modules)
- [SASS Loader](https://github.com/webpack-contrib/sass-loader)
- [Autoprefixer](https://github.com/postcss/autoprefixer) - Automatically add browser prefixes to css styles to improve legacy compatibility and support new features.

## Bundler

- [Webpack](https://webpack.js.org/concepts/) will be used to bundle, minify, uglify, all assets.

## Version Control

- Github will be used with [Github Forking](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

## Deployment

- A continuous integration approach will be taken. For this, we will utilize [Circle CI](https://circleci.com/docs/2.0/)

## HTTP

- HTTP Library:

  - [Axios](https://github.com/axios/axios)

    - Promise-based
    - Lots of activity on github

      - recently closed issues, stars, follows, etc

    - Ability to cancel requests

## Middleware

- We use a custom middleware that resides in `./src/utils/apiMiddleware.ts`

  - For asynchronous Action Creators
  - Used in conjunction with [Axios](https://github.com/axios/axios) for API calls

### Structure

```typescript
.
├── public/                       # Static files（including css, images, fonts, index.html e.g）
│   ├── images/                   # Public image resources
│   ├── css/                      # Public css resources
│   ├── fonts/                    # Public font resources
│   ├── icons/                    # Public svg icon resources
│   └── ...
├── src/
│   ├── components/               # Global react components
│   │   └── ...
│   ├── assets/                   # Global react assets
│   │   └── ...
│   ├── store/                    # Redux store config
│   │   └── ...
│   ├── pages/                    # All pages view
│   │   └── ...
│   ├── router/                   # App routing
│   │   └── router.tsx
│   ├── reducers/                 # App reducers
│   │   └── ...
│   ├── services/                 # API request services
│   │   └── ...
│   ├── styles/                    # Global CSS style
│   │   └── ...
│   ├── utils/                    # Global utils
│   │   └── ...
│   ├── App.scss                   # App component CSS style
│   ├── App.tsx                   # App root component
│   ├── App.test.tsx              # App jest test case
│   ├── index.tsx                 # React entry file
│   ├── logo.svg                  # App logo
│   │
├── dist/                        # The production static files
├── .gitignore                    # Git ignore config（Do not tamper with the configuration!!!）
├── .editorconfig                 # VS Code editor config（Do not tamper with the configuration!!!）
├── Dockerfile                    # Docker deploy config（Do not tamper with the configuration!!!）
├── .npmrc                        # Storage of keys for packages
├── tslint.json                   # tslint rules config（Do not tamper with the configuration!!!）
└── package.json                  # Build script and packages config（Do not tamper with the configuration!!!）
└── package-lock.lock             # npm lock file
└── README.md                     # Project README file
```
