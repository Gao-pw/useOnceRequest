const path = require('path');
module.exports = {
  entry: {
    index: './src/index.ts',
  },
  experiments: {
    outputModule: true,
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  externals:{
    'react': 'react',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
