# SYMETRIA Backend boilerplate (Node + Express + Mongoose)

This boilerplate offers a starting point for Symetria backend projects.

## Installation

To create a new project using this template, you can use the CLI tool provided by this package.

### Install Using npx

1. `npx symetria-backend project-name`
2. Replace project-name with a desired name for your project.

### Global Installation

1. You can install the package globally with `npm install -g symetria-backend`
2. Then run `symetria-backend project-name`

How to run the template:

1. Create a `.env` file in the root of the project using `.env.example` as reference.
2. User `npm run dev` to start the development server.
3. Run `npm start` in production

**Extras:**
To enable route testing (example in `/requests` folder) you need to install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

**Important:**
Formatting should be handled by eslint, please add this settings to your VS Code settings JSON file:

> "eslint.format.enable": true,
> "editor.codeActionsOnSave": {
> "source.addMissingImports.ts": "explicit",
> "source.fixAll.eslint": "always"
> },
> "eslint.validate": ["javascript"],
