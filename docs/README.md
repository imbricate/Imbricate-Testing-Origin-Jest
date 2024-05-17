# Imbricate-Testing-Origin-Jest

[![npm version](https://badge.fury.io/js/%40imbricate%2Ftest-origin-jest.svg)](https://badge.fury.io/js/%40imbricate%2Ftest-origin-jest)
[![downloads](https://img.shields.io/npm/dm/@imbricate/test-origin-jest.svg)](https://www.npmjs.com/package/@imbricate/test-origin-jest)

Jest test kit for Imbricate Origin Testing

## Install

```sh
yarn add @imbricate/test-origin-jest
# Or
npm install @imbricate/test-origin-jest --save
```

## Usage

To test an Imbricate origin, simply supply the origin as a `TestingTarget` to `startImbricateOriginTest`.

```js
import { startImbricateOriginTest, ImbricateOriginTestingTarget } from '@imbricate/test-origin-jest';

startImbricateOriginTest(
    ImbricateOriginTestingTarget.fromConstructor(
        async () => {
            return new MyOrigin();
        },
    ),
);
```

## Documentation

Visit [imbricate.io](https://imbricate.io/).
