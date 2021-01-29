const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

const stylesLoadresSettings = [
  'css-loader',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: ['./src/styles/base/_variables.scss'],
    },
  },
];

const pluginsSettings = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
  }),
];

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@layout': path.resolve(__dirname, 'src/layout/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
        exclude: '/node_modules/',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: process.env.ALL_IN_JS
          ? [...stylesLoadresSettings]
          : [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === 'development',
                },
              },
              ...stylesLoadresSettings,
            ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: process.env.ALL_IN_JS
    ? [...pluginsSettings]
    : [
        ...pluginsSettings,
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].styles.min.css',
        }),
      ],
};
