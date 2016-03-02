module.exports = {
  output: {
    path: __dirname,
    filename: 'numl.js'
  },
  module: {
    loaders: [{
      test: /\.pegjs$/,
      loader: 'pegjs-loader'
    }]
  }
};
