const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts']
    },
    alias: {
      '@pinwheel/react-modal': path.resolve(__dirname, '../dist')
    }
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PINWHEEL_API_KEY': JSON.stringify(
        process.env.PINWHEEL_API_KEY || ''
      ),
      'process.env.PINWHEEL_API_URL': JSON.stringify(
        process.env.PINWHEEL_API_URL || 'https://sandbox.getpinwheel.com'
      )
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000
  }
}
