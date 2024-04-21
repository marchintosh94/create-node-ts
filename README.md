# create-node-ts

`create-node-ts` is a project generator for creating Node.js applications with TypeScript. It sets up a new project with a basic structure and some default configuration, including Jest for testing, Prettier for code formatting, and Husky for Git hooks.

## Installation

You don't need to install `create-node-ts` to use it. Instead, you can use `npx`:

```bash
npx @marchintosh94/create-node-ts
```

This will run create-node-ts and start the process of setting up a new project.

## Usage
When you run `create-node-ts`, it will prompt you for some information about your project:

- `Project name`: The name of your new project.

After you've provided this information, `create-node-ts` will create a new directory (if you choose to create it) with your project name, set up the project structure, and install the dependencies.

The generated project includes the following files and directories:

- `src`: This directory is where your TypeScript source code goes.
- `package.json`: This file contains the metadata about your project and its dependencies.
- `tsconfig.json`: This file is the TypeScript compiler configuration.
- `jest.config.ts`: This file is the Jest configuration.
- `.gitignore`: This file tells Git which files to ignore.
- `.prettierrc` and `.prettierignore`: These files are the Prettier configuration.
In addition, `create-node-ts` initializes a Git repository in your project directory and sets up Husky to run tests and linting before each commit.

## Contributing
Contributions to `create-node-ts` are welcome! Please open an issue or submit a pull request on GitHub.

## License
`create-node-ts` is licensed under the MIT license. See the LICENSE file for more information.