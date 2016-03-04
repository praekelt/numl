module.exports = {
  output: {
    path: __dirname,
    filename: 'numl.js',
    library: 'numl',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.pegjs$/,
      loader: 'pegjs-loader'
    }, {
			test: /\.mst$/,
			loader: 'mustache'
		}]
  }
};
