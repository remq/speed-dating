## Introduction

Want to meet some of your new colleagues? Try speed dating!

## Prerequisites

[Node.js](https://nodejs.org/) is required for this project. You can download dependencies by running:

```bash
npm install
```

Alternatives, like Yarn or pnpm, should work as well.

## Setup

Two files will need to be created:

1. `private/colleagues.json`
2. `private/exclusions.json`

`private/colleagues.json` will contain a list of colleagues that are participating. Example:

```json
["John", "Bob", "Alice", "Denise"]
```

`private/exclusions.json` will contain a list of colleagues who already know eachother and shouldn't be matched. Example:

```json
[
  ["Bob", "Alice"],
  ["Bob", "Denise"]
]
```

In `index.ts` you can edit the number of speed dating rounds by setting the `NUMBER_OF_ROUNDS` constant.

To generate the rounds you can run:

```bash
npm start
```

This will generate `rounds.csv` which will contain the matchups.
