# evently

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> A monorepo to demonstrate full stack engineering principles

Tech Stack:

1. `client`: React (Typescript)
2. `server`: NodeJS Express (Typescript)


## Prerequisites

**Git**
- Install ['Git'](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for your OS

**Node**

- Install [`NodeJS`](https://nodejs.org/en/download/). Currently using `v14.15.4 LTS`.
- Run `node --version` in a terminal to verify which version is installed.

**Firebase Tools**
- Run the following command in a command promt

```
npm i -g firebase-tools
```

**VSCode**

[VS Code](https://code.visualstudio.com/) is a preferred editor for this project. *(Optional)*

Helpful extensions:
1. [Typescript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Setup

To install dependencies. This project is managed as a monorepo via `lerna`.
```
npm i
```

## Development

To run development servers
```
npm run dev
```

To focus on a specific package (`server` or `client`), open

## Testing

To run all tests
```
npm run test
```

## Build

To build all packages
```
npm run build
```


## Environments
**Local**
- Client: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:5001/et-2021a-dev/us-central1/api](http://localhost:5001/et-2021a-dev/us-central1/api)


**Development**
- Client: [https://et-2021a-dev.web.app/](https://et-2021a-dev.web.app/)
- API: [https://us-central1-et-2021a-dev.cloudfunctions.net/api](https://us-central1-et-2021a-dev.cloudfunctions.net/api)
  

**Staging**
- Client: [https://et-2021a-stage.web.app/](https://et-2021a-stage.web.app/)
- API: [https://us-central1-et-2021a-stage.cloudfunctions.net/api](https://us-central1-et-2021a-stage.cloudfunctions.net/api)


**Production**
- Client: [https://et-2021a-prod.web.app/](https://et-2021a-prod.web.app/)
- API: [https://us-central1-et-2021a-prod.cloudfunctions.net/api](https://us-central1-et-2021a-prod.cloudfunctions.net/api)

## Other
To reset/clean the environment
```
npm run clean
```

# Contributing


## Git Commit Messages

This repo and build process relies on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard. Below is an example of these for quick reference:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests