const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// ################ OPTIONAL SETTING FOR SCSS ################

// {
//   test: /\.(sa|sc|c)ss$/,
//   use: [
//     'style-loader',
//     'css-loader',
//     'sass-loader',
//     {
//       loader: 'sass-resources-loader',
//       options: {
//         resources: ['./src/styles/base/_variables.scss', './src/styles/utils/_mixins.scss'],
//       },
//     },
//   ],
// },

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
      '@src': path.resolve(__dirname, 'src/'),
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
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
