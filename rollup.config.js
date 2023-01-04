/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const css = require('rollup-plugin-import-css')
const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')
const json = require('@rollup/plugin-json')

module.exports = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.modern.js',
      format: 'es'
    }
  ],
  plugins: [css(), typescript()],
  external: Object.keys(pkg.peerDependencies)
}
