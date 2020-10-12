module.exports = {
    entry: './src/background.js',
    target: 'node',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'background.js'
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env.FLUENTFFMPEG_COV': false
      })
  ]
  }