# @pinwheel/react-modal

> React package for Pinwheel modal

[![NPM](https://img.shields.io/npm/v/@pinwheel/react-modal.svg)](https://www.npmjs.com/package/@pinwheel/react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @pinwheel/react-modal
```

## Usage

```jsx
import PinwheelModal from '@pinwheel/react-modal'

const App = () => {
  return <PinwheelModal
    open={true}
    linkToken={token}
    onEvent={console.log}
  />
}
```

Please consult [our docs](https://docs.getpinwheel.com/link/index.html#usage) for more information.

## Quick Start

You may want to explore the usage of the modal locally.

Start by going to the [developer dashboard](https://developer.getpinwheel.com/test-console) to create a token. Copy the token string. Then

```sh
cd example
npm i
npm start
# Go to localhost:3000?token=<PASTE YOUR GENERATED TOKEN HERE>
`

## Dev Workflow Commands

 ### Make Feature

 The starting point for any dev work being done should be a JIRA ticket. JIRA has automation rules that will handle moving TKTs into the right status, as long as the TKT number is in the branch name.

 To handle this for you, we have a `make feature` command that you'll want to use when starting development. From any branch, simply run `make feature` to get started.
 This will ask for a few things:

 1. **JIRA Ticket Numbers**: enter the JIRA ticket number that you're working on (includes project abbreviation and number, i.e. `INT-1643`). This will ask for multiple TKT numbers, if it's just one TKT then press enter when it asks for another one.
 2. **Name**: A very brief name for the branch, i.e. `paycom-login`.

 A new feature branch will then be created with the tkt numbers and name provided.

## License

MIT © [roscioli](https://github.com/roscioli)
