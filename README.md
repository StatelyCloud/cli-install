# Node.js/npm Stately CLI installer

A simple Node.js installer for the Stately CLI (https://docs.stately.cloud/cli/). This allows
you to depend on Stately CLI from your `package.json` and install it as part of the `npm install` command, so you don't have to worry about installing
it separately.

Add it to your project:

```bash
$ npm install -D @stately-cloud/cli
# or
$ yarn add -D @stately-cloud/cli
# or (see note about PNPM below)
$ pnpm add -D @stately-cloud/cli
```

Or run the CLI directly via npx without installing:

```bash
$ npx @stately-cloud/cli login
```

**A note about PNPM**: As of PNPM v10, [you must add this package to `pnpm-workspace.yml` in the `onlyBuiltDependencies` setting](https://pnpm.io/settings#onlybuiltdependencies) in order for it to be installed, since PNPM skips running `preinstall` scripts from dependencies.

## Purpose

The Stately CLI lets you manage your [Elastic Schema](https://docs.stately.cloud/intro/elastic-schema/) for [StatelyDB](https://docs.stately.cloud/intro/what-is-statelydb/). After installation, the `stately` command will work in npm scripts:

```js
// package.json:

{
  // ...
  "scripts": {
    "generate": "stately schema generate -l ts ./app/schema"
  }
}
```

Or with `npx`:

```bash
$ npx stately schema generate -l ts ./app/schema
```
