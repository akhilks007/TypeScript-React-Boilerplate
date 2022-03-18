const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
    // publicPath: '/', //relative path to output path where  devserver will look for compiled files
    static: {
      directory: path.join(__dirname, 'public'),
    },

    compress: true,
    port: 3000, // default 8000
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // base path where to send compiled assets
    // publicPath: '/', // base path where referenced files will be look for
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // shortcut to reference src folder from anywhere
    },
  },
  module: {
    rules: [
      {
        // config for es6 jsx
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // config for sass compilation
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        // config for images
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        // config for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
};
