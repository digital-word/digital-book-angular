# Digital Book - Angular

## Description

Digital Book is a comprehensive application designed to offer a rich set of features for book enthusiasts and knowledge workers. The platform provides an enjoyable reading experience with integrated tools for PDFs, search capabilities, AI-powered assistance, and note-taking functionality.

This frontend application currently implements the **Notes feature** - a sophisticated note management system with rich text editing using Quill Delta format. The Notes feature includes:

- Rich text editing with Quill Delta format
- Organization with tags and categories
- Soft deletion and favorites
- Search capabilities

As the project grows, features like Notes can evolve into independent microservices, enabling flexible scaling and deployment strategies.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Tech Stack

- **Framework**: Angular
- **Language**: TypeScript
- **UI Components**: Angular Material

## Project setup

This project uses [Volta](https://volta.sh/) to automatically manage the correct Node.js version.

### 1. Install prerequisites

<details>
<summary><strong>macOS / Linux (bash)</strong></summary>

```bash
# Install Volta
$ curl https://get.volta.sh | bash

# Install Angular CLI globally
$ npm install -g firebase
```

</details>

<details>
<summary><strong>Windows (PowerShell / cmd)</strong></summary>

```powershell
# Install Volta
> winget install Volta.Volta

# Install Angular CLI globally
> npm install -g firebase
```

</details>

### 2. Install dependencies

Open a new terminal so Volta picks up the Node version pinned in `package.json`, then run:

```bash
$ npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

As an alternative, you can run unit tests from the VS Code Run and Debug view. Use the `ng test` debug configuration to start Karma and open the browser debugger.

## Running debug

You can also use the VS Code Run and Debug view to debug the application. Use the `ng serve` debug configuration to start the app and attach Chrome for debugging.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
