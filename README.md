## esbuild split vendors example

See [build.js](./build.js) and [index.html](./index.html).

Supports environments without esm.

### limits

- vendors are packed into one file.
- vendors must be downloaded before main code.
- vendors are not tree-shaked ([#1](https://github.com/hyrious/esbuild-split-vendors-example/issues/1)).

### to overcome

Use [vite](https://vitejs.dev).

### license

The Unlicense.
