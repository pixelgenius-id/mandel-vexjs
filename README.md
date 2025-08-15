# @pixelgeniusid/vexjs  
![npm version](https://img.shields.io/npm/v/@pixelgeniusid/vexjs.svg)  
![npm downloads](https://img.shields.io/npm/dw/@pixelgeniusid/vexjs.svg)  
![GitHub Workflow Status](https://github.com/pixelgenius-id/mandel-vexjs/actions/workflows/node.js.yml/badge.svg)

## <span style="color:#ffe200">⚠ This is a modified fork of [mandel-eosjs](https://github.com/eosnetworkfoundation/mandel-eosjs)</span>

Adapted by [pixelGeniusid](https://github.com/pixelgenius-id) for the [Vexanium](https://vexanium.com) blockchain.

---

## Installation

### NPM

[@pixelgeniusid/vexjs](https://www.npmjs.com/package/@pixelgeniusid/vexjs) is an adaptation of `mandel-eosjs` to work seamlessly with Vexanium nodes and features.

```bash
npm install @pixelgeniusid/vexjs
```

---

### NodeJS Dependency

```bash
npm install @pixelgeniusid/vexjs
```

---

### Using with Typescript

If you're using Node (not a browser), make sure the `dom` lib is referenced in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": [..., "dom"]
  }
}
```

---

### Browser Distribution

Clone this repository locally, then run:

```bash
npm run build-web
```

The browser distribution will be located in `dist-web` and can be directly copied into your project repository.  
The `dist-web` folder contains minified bundles ready for production, along with source-mapped versions for debugging.

---

## Getting Started

Example usage of **@pixelgeniusid/vexjs**:

```bash
npm init es6
npm install @pixelgeniusid/vexjs
node node_test
```

**node_test.js**
```js
import { Api, JsonRpc, RpcError } from '@pixelgeniusid/vexjs';
import fetch from 'node-fetch'

const rpc = new JsonRpc('https://testnet.vexanium.com', { fetch });
const api = new Api({ rpc, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const info = await rpc.get_info();
console.log(info);
```

---

## Import

### ES Modules
```js
import { Api, JsonRpc, RpcError } from '@pixelgeniusid/vexjs';
import { JsSignatureProvider } from '@pixelgeniusid/vexjs/dist/eosjs-jssig'; // dev only
```

### CommonJS
```js
const { Api, JsonRpc, RpcError } = require('@pixelgeniusid/vexjs');
const fetch = require('node-fetch');
```

---

## Basic Usage

### Signature Provider
```js
const defaultPrivateKey = "YOUR_PRIVATE_KEY";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
```

### JSON-RPC
```js
const rpc = new JsonRpc('https://testnet.vexanium.com', { fetch });
```

### API
```js
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
```

### Sending a transaction
```js
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'vex.token',
      name: 'transfer',
      authorization: [{
        actor: 'youraccount',
        permission: 'active',
      }],
      data: {
        from: 'youraccount',
        to: 'targetaccount',
        quantity: '1.0000 VEX',
        memo: 'Test transfer',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30
  });
  console.dir(result);
})();
```

---

## License

This project is released under the MIT License.  
See [LICENSE](./LICENSE) for details.

Original work:
- [mandel-eosjs](https://github.com/eosnetworkfoundation/mandel-eosjs) — © 2021-2022 EOS Network Foundation
- [eosjs](https://github.com/EOSIO/eosjs) — © 2017-2019 block.one

Modifications for Vexanium blockchain:
- © 2025 pixelGeniusid
