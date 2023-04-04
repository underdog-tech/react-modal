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

Please consult [our docs](https://docs.pinwheelapi.com/docs/link-1) for more information.

## Quick Start

You may want to explore the usage of the modal locally.

Start by going to the [developer dashboard](https://developer.getpinwheel.com/test-console) to create a token. Copy the token string. Then

```sh
cd example
npm i
npm start
# Go to localhost:3000?token=<PASTE YOUR GENERATED TOKEN HERE>
```

## License

MIT ©
Pinwheel React Modal is available under the MIT license. See the LICENSE file for more info.
