const path = require('path');
const webpack = require('webpack');

const getConfig = () => ({
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js',
  },
  plugins: [
    // make the output a node executable
    new webpack.BannerPlugin({ 
      banner: '#!/usr/bin/env node', 
      raw: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.mjs', '.ts'],  
    modules: [
      'node_modules',
    ],
    fallback: {
      path: 'path',
      process: 'process',
    },
  },
  externals: [
    { '@swc/core': 'swc' },
  ],
  module: {
    rules: [
      // some node modules use typescript
      {
        test: /\.ts$/,
        include: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
      // load the app's source code
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              target: 'es5',
              minify: {
                compress: true,
                mangle: true,
              },
            },
            module: {
              type: 'commonjs',
            },
          },
        },
      },
    ]
  },
});

module.exports = { getConfig };