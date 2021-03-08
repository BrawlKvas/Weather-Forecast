/*eslint-disable*/
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = true

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  // resolve: {
  //   alias: {
  //     '@modules': path.resolve(__dirname, 'src/modules'),
  //   }
  // },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|webp)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      }
    ]
  }
}
