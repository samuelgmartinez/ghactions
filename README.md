# Core Platform Actions

This folder contains all GitHub Actions specific jobs for the ecommerce core platform repositories.

All actions are written in NodeJS 12.x.

After each merge, this project will build the actions into a single file distributable in `ACTION_FOLDER/dist/index.js` and will add it to the repository automatically. See `.github/workflows/openplatform-package-actions.yml` for more information.


## Available actions

* [schema-publisher-action](./schema-publisher-action/): This action publishes the modified subjects to Ceph.
* [schema-validator-action](./validate-schema-action/): This action validates the JSON schemas in specification and format.


## How to build and test the actions

This folder is structured as a NodeJS monorepo relying on `lerna` to run the actions on each of the modules.

To setup the local environment and install all required dependencies:
```bash
npm i
npx lerna bootstrap
```

Once the dependencies are all set, you can run the tests executing the following command:
```bash
npx lerna run test
```

## How to add a new action to the project

To add a new action to the project, you just need to create its folder inside the `./packages` folder and init it with npm:
```bash
mkdir packages/my-action-name && cd $_
npm init -y
```

After that, you only need to install all basic dependencies:
```bash
npm i @actions/core @actions/github
npm i -D @zeit/ncc chai mocha sinon
```